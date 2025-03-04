const CACHE_NAME = 'service-worker-cache';
const urlsToCache = [
    //'./',
    //'./index.html',
    './styles.css',
    './script.js',
    //'./manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('sync', event => {
    if (event.tag === 'sync-demo') {
        event.waitUntil(
            // Perform your background sync operation here
            fetch(window.location.href)
                .then(response => {
                    if (!response.ok) throw Error('Sync failed');
                    console.log('Background sync successful');
                })
                .catch(err => {
                    console.error('Background sync failed:', err);
                })
        );
    }
});