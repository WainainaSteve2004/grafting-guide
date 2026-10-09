const CACHE_NAME = 'grafting-cache-v3';
const ASSETS_TO_CACHE = [
  './manifest.json',
  './images/hero-bg.jpg',
  './images/1-mango.jpg',
  './images/2-orange.jpg',
  './images/3-lemon.jpg',
  './images/4-avocado.jpg',
  './images/5-apple.jpg',
  './images/6-coffee.jpg',
  './images/method-cleft.jpg',
  './images/method-budding.jpg',
  './images/method-whip-tongue.jpg',
  './images/method-side-veneer.jpg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
