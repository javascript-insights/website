const CACHE_NAME_I = 'network-tool-cache-theoretical-2-install';
const CACHE_NAME_F = 'network-tool-cache-theoretical-2-fetch';
const urlsToCache = [
    './index.html',
    './index.js'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME_I)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(response => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200) {
                            return response;
                        }
                        // Clone the response as it can only be consumed once
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME_F)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    })
                    .catch(() => {
                        // Return a fallback response if fetch fails
                        return new Response('Network error occurred', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});