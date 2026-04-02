const CACHE_NAME = 'smashpro-v3.5';
const assets = [
  './',
  './index.html',
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js',
  'https://www.gstatic.com/charts/loader.js'
];

// Installerer Service Worker og gemmer filer i cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Sørger for at appen virker, selvom forbindelsen er dårlig
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});