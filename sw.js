const CACHE_NAME = 'grafting-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './images/1-mango.jpg',
  './images/2-orange.jpg',
  './images/3-lemon.jpg',
  './images/4-avocado.jpg',
  './images/5-apple.jpg',
  './images/6-coffee.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
