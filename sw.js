const VERSION  = 'v13-2025-11-23';

const PRECACHE = `bloodsteel-precache-${VERSION}`;
const RUNTIME  = `bloodsteel-runtime-${VERSION}`;

const SCOPE = self.registration.scope; // e.g. https://tuuser.github.io/bloodsteel-site/
const U = (p) => new URL(p, SCOPE).toString();

/* Manifiesto base */
const PRECACHE_URLS = [
  U('/bloodsteel-site/index.html'),
  U('/bloodsteel-site/pages/comic.html'),
  U('/bloodsteel-site/pages/historia.html'),
  U('/bloodsteel-site/pages/personajes.html'),
  U('/bloodsteel-site/assets/css/main.css'),
  U('/bloodsteel-site/assets/css/comic.css'),
  U('/bloodsteel-site/assets/js/main.js'),
  U('/bloodsteel-site/assets/js/comic.js'),
  U('/bloodsteel-site/assets/img/Empresa/LogoEmpresa.png'),
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
      Promise.all(
        keys
          .filter((k) => ![PRECACHE, RUNTIME].includes(k))
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* Fetch */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const accept = req.headers.get('accept') || '';
  const isHTML = accept.includes('text/html');

  // HTML => network-first
  if (isHTML) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME).then(c => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // CSS / JS / IMG => stale-while-revalidate
  event.respondWith(
    caches.match(req).then(cached => {
      const fetchPromise = fetch(req).then(res => {
        const copy = res.clone();
        caches.open(RUNTIME).then(c => c.put(req, copy));
        return res;
      }).catch(() => cached);

      return cached || fetchPromise;
    })
  );
});

/* Warm-up (desde main.js) */
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
