const CACHE_NAME = 'grafting-cache-v2';
const ASSETS_TO_CACHE = [
  './',
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

// Install Event
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event: Clear old cache versions automatically
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

// Fetch Event: Network First strategy for HTML pages
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
