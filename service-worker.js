const CACHE_NAME = 'rly-core-v1';
const ASSETS = [
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json'
];

// ऑफलाइन सिलिका अणुओं और तरंगों के लिए कर्नल कैशिंग
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

