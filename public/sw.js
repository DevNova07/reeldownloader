const CACHE_NAME = 'instasnap-pwa-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Don't block installation if some assets fail to cache out of the box
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Exclude API calls and third party domains from caching strategy
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin) || event.request.url.includes('/api/')) {
    return;
  }

  // Network-first strategy for safety (doesn't trap user on old Next.js build)
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          // Basic offline fallback 
          return new Response('Internet Connection Lost.', { headers: { 'Content-Type': 'text/plain' }});
        });
      })
  );
});
