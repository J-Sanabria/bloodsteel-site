/* sw.js — BloodSteel precache + runtime cache */
const PRECACHE = 'bloodsteel-precache-v1';
const RUNTIME  = 'bloodsteel-runtime-v1';

/* Manifiesto base (CSS/JS/logo/etc.). Agrega aquí lo crítico global. */
const PRECACHE_URLS = [
  '/',                         // tu index si sirve desde raíz
  '/pages/comic.html',
  '/pages/historia.html',
  '/assets/css/main.css',
  '/assets/css/comic.css',
  '/assets/js/main.js',
  '/assets/js/comic.js',
  '/assets/img/Empresa/LogoEmpresa.png',
  'https://fonts.googleapis.com/css2?family=Quantico:wght@400;700&display=swap'
];

/* Install: precache crítico */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

/* Activate: limpia versiones viejas */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => ![PRECACHE, RUNTIME].includes(k))
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* Fetch:
   - HTML: network-first (para que el sitio actualice)
   - static (img/css/js): cache-first (rápido y offline-ish)
*/
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Sólo maneja GET y mismo origen o fuentes estáticas externas (fuentes, cdn)
  if (req.method !== 'GET') return;

  // HTML -> network-first
  if (req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Otros (img/css/js) -> cache-first
  event.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(RUNTIME).then((c) => c.put(req, copy));
        return res;
      }).catch(() => hit);
    })
  );
});

/* Warm-up desde la página (recibe lista de URLs para cachear) */
self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'WARM' && Array.isArray(data.urls)) {
    event.waitUntil(
      caches.open(RUNTIME).then((cache) =>
        Promise.all(
          [...new Set(data.urls)].map((u) =>
            cache.match(u).then((m) => m || cache.add(u).catch(()=>null))
          )
        )
      )
    );
  }
});
