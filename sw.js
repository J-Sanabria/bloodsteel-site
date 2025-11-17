/* sw.js — BloodSteel precache + runtime cache */
const PRECACHE = 'bloodsteel-precache-v1';
const RUNTIME  = 'bloodsteel-runtime-v1';

const SCOPE = self.registration.scope; // e.g. http://127.0.0.1:5500/
const U = (p) => new URL(p, SCOPE).toString();

/* Manifiesto base */
const PRECACHE_URLS = [
  '/bloodsteel-site/index.html',
  '/bloodsteel-site/pages/comic.html',
  '/bloodsteel-site/pages/historia.html',
  '/bloodsteel-site/pages/personajes.html',
  '/bloodsteel-site/assets/css/main.css',
  '/bloodsteel-site/assets/css/comic.css',
  '/bloodsteel-site/assets/js/main.js',
  '/bloodsteel-site/assets/js/comic.js',
  '/bloodsteel-site/assets/img/Empresa/LogoEmpresa.png',
  // Fuentes externas (se almacenan como opaque, está bien para dev)
  'https://fonts.googleapis.com/css2?family=Quantico:wght@400;700&display=swap'
];

/* Install */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

/* Activate */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys
        .filter((k) => ![PRECACHE, RUNTIME].includes(k))
        .map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* Fetch */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

// HTML => network-first
if (req.headers.get('accept')?.includes('text/html')) {
  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();   // clone ANTES de usar response
        caches.open(RUNTIME).then(c => c.put(req, copy));
        return res;                 // devolvemos el original
      })
      .catch(() => caches.match(req))
  );
  return;
}

// CSS / JS / IMG => cache-first
event.respondWith(
  caches.match(req).then(hit => {
    if (hit) return hit;

    return fetch(req).then(res => {
      const copy = res.clone();
      caches.open(RUNTIME).then(c => c.put(req, copy));
      return res;
    });
  })
);

});

/* Warm-up (desde main.js) */
self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'WARM' && Array.isArray(data.urls)) {
    event.waitUntil(
      caches.open(RUNTIME).then((cache) =>
        Promise.all([...new Set(data.urls)].map((u) =>
          cache.match(u).then((m) => m || cache.add(u).catch(()=>null))
        ))
      )
    );
  }
});
