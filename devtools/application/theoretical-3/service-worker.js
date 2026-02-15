const CACHE_NAME = 'theoretical-3-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './styles.css',
    './index.js',
    './getstarted.json',
    './back-forward-cache.html',
    './back-forward-cache-incompatible.html',
    './background-fetch.html',
    './background-sync.html',
    './bounce-tracking.html',
    './notifications.html',
    './payment-handler.html',
    './periodic-sync.html',
    './speculative-loads.html',
    './push-messaging.html',
    './reporting-api.html'
];

self.addEventListener('install', event => {
    console.log('Main Service Worker installing.');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching app shell assets — check Application > Cache Storage');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('Main Service Worker activating.');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => {
                        console.log('Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    // Cache-first strategy — visible in Application > Cache Storage
    console.log('Fetching:', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    console.log('Served from cache:', event.request.url);
                    return cachedResponse;
                }
                return fetch(event.request).then(response => {
                    // Optionally cache new requests
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                });
            })
    );
});
