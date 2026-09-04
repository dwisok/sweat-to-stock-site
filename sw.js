// Sweat-to-Stock service worker: the app works offline (a run never depends on the network).
const VERSION = 'v1';
const SHELL = ['./app/', './app/index.html', './app/config.js', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-512-maskable.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;               // fonts, etc.: straight to the network
  const fresh = /\.(html|js|json|webmanifest)$/.test(url.pathname) || url.pathname.endsWith('/');
  if (fresh) {
    // Network first, so an update shows on the next open; cache fallback so the app opens offline.
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return r; })
      .catch(() => caches.match(req, { ignoreSearch: true })));
  } else {
    // Frames, media, icons: cache first.
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return r; })));
  }
});
