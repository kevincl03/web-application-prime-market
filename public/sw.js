// Service Worker for caching and performance optimization
const STATIC_CACHE_NAME = 'prime-market-static-v1';
const DYNAMIC_CACHE_NAME = 'prime-market-dynamic-v1';

// Resources to cache immediately
const STATIC_ASSETS = [
   '/',
   '/products',
   '/manifest.json',
   '/icons/logo.svg',
   '/images/header1.png',
   '/images/header2.png',
];

// API endpoints to cache with stale-while-revalidate strategy
const API_CACHE_PATTERNS = [
   /\/api\/products/,
   /\/products\/api\/getdata/,
];

// Image cache patterns
const IMAGE_CACHE_PATTERNS = [
   /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
   /\/images\//,
   /\/icons\//,
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
   event.waitUntil(
      caches.open(STATIC_CACHE_NAME)
         .then((cache) => {
            return cache.addAll(STATIC_ASSETS);
         })
         .then(() => {
            return self.skipWaiting();
         })
         .catch((error) => {
            console.error('Service Worker: Error caching static assets:', error);
         })
   );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
   event.waitUntil(
      caches.keys()
         .then((cacheNames) => {
            return Promise.all(
               cacheNames
                  .filter((cacheName) => {
                     return cacheName !== STATIC_CACHE_NAME &&
                        cacheName !== DYNAMIC_CACHE_NAME &&
                        cacheName.startsWith('prime-market-');
                  })
                  .map((cacheName) => {
                     return caches.delete(cacheName);
                  })
            );
         })
         .then(() => {
            return self.clients.claim();
         })
   );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
   const { request } = event;
   const url = new URL(request.url);

   if (request.method !== 'GET') {
      return;
   }

   // Skip chrome-extension and other non-http requests
   if (!url.protocol.startsWith('http')) {
      return;
   }

   event.respondWith(
      (async () => {
         try {
            // Strategy 1: Cache First for static assets
            if (STATIC_ASSETS.some(asset => url.pathname.endsWith(asset))) {
               return await cacheFirst(request, STATIC_CACHE_NAME);
            }

            // Strategy 2: Stale While Revalidate for API calls
            if (API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
               return await staleWhileRevalidate(request, DYNAMIC_CACHE_NAME);
            }

            // Strategy 3: Cache First for images with fallback
            if (IMAGE_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
               return await cacheFirstWithFallback(request, DYNAMIC_CACHE_NAME);
            }

            // Strategy 4: Network First for other requests
            return await networkFirst(request, DYNAMIC_CACHE_NAME);
         } catch {
            console.error('Service Worker: Fetch error');
            return new Response('Network error', { status: 503 });
         }
      })()
   );
});

// Cache First Strategy - for static assets
async function cacheFirst(request, cacheName) {
   const cache = await caches.open(cacheName);
   const cachedResponse = await cache.match(request);

   if (cachedResponse) {
      return cachedResponse;
   }

   const networkResponse = await fetch(request);

   if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
   }

   return networkResponse;
}

// Stale While Revalidate Strategy - for API calls
async function staleWhileRevalidate(request, cacheName) {
   const cache = await caches.open(cacheName);
   const cachedResponse = await cache.match(request);

   const fetchPromise = fetch(request).then(response => {
      if (response.ok) {
         cache.put(request, response.clone());
      }
      return response;
   }).catch(() => null);
   if (cachedResponse) {
      void fetchPromise;
      return cachedResponse;
   }

   const networkResponse = await fetchPromise;
   return networkResponse || new Response('Service unavailable', { status: 503 });
}

// Cache First with Fallback - for images
async function cacheFirstWithFallback(request, cacheName) {
   try {
      return await cacheFirst(request, cacheName);
   } catch {
      return new Response('', { status: 200 });
   }
}

// Network First Strategy - for dynamic content
async function networkFirst(request, cacheName) {
   const cache = await caches.open(cacheName);

   try {
      const networkResponse = await fetch(request);

      if (networkResponse.ok) {
         cache.put(request, networkResponse.clone());
      }

      return networkResponse;
   } catch (error) {
      const cachedResponse = await cache.match(request);

      if (cachedResponse) {
         return cachedResponse;
      }

      throw error;
   }
}

// Performance monitoring
self.addEventListener('message', (event) => {
   if (event.data && event.data.type === 'PERFORMANCE_REPORT') {
   }
});

// Cleanup function for memory management
function cleanupCaches() {
   caches.keys().then(cacheNames => {
      cacheNames.forEach(cacheName => {
         if (cacheName.startsWith('prime-market-dynamic-')) {
            caches.open(cacheName).then(cache => {
               cache.keys().then(requests => {
                  if (requests.length > 100) { // Limit cache size
                     const oldestRequests = requests.slice(0, 50);
                     oldestRequests.forEach(request => cache.delete(request));
                  }
               });
            });
         }
      });
   });
}

// Run cleanup every hour
setInterval(cleanupCaches, 60 * 60 * 1000);
