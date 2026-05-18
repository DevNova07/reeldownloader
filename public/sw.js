const CACHE_NAME = 'savclip-pwa-v3';
const OFFLINE_URL = '/offline.html';

const STATIC_ASSETS = [
  '/',
  OFFLINE_URL,
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
];

// 1. Install - Pre-cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(err => console.error('PWA: Pre-cache failed', err));
    })
  );
  self.skipWaiting();
});

// 2. Activate - Clean up old caches & enable Navigation Preload
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
    ])
  );
  
  // Enable navigation preload if supported for faster page loads
  if (self.registration.navigationPreload) {
    event.waitUntil(self.registration.navigationPreload.enable());
  }
});

// 3. Fetch - Optimized Strategies based on asset type
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip API calls, non-origin requests, and localhost (dev mode)
  if (url.origin !== self.location.origin || url.pathname.includes('/api/') || url.hostname === 'localhost') {
    return;
  }

  // Handle Navigation requests (HTML pages) - Network first with Preload support
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) return preloadResponse;
          
          return await fetch(event.request);
        } catch (error) {
          const cachedPage = await caches.match(event.request);
          if (cachedPage) return cachedPage;
          return caches.match(OFFLINE_URL) || caches.match('/');
        }
      })()
    );
    return;
  }

  // Cache-First strategy for Next.js static assets and immutable files (SUPER FAST)
  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/images/') || url.pathname.endsWith('.png') || url.pathname.endsWith('.svg')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse; // Instant load from cache
        
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // For other assets: Stale-while-revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return networkResponse;
      });
      return cachedResponse || fetchPromise;
    })
  );
});

// 4. Push Notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { 
    title: 'SavClip Update', 
    body: 'New features are available! Check them out.' 
  };

  const options = {
    body: data.body,
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// 5. Notification Click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
