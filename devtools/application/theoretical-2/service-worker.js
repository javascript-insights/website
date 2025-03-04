/**
 * Service Worker for caching and offline functionality
 * @constant {string} CACHE_NAME - Name of the cache storage
 * @constant {Array<string>} urlsToCache - List of URLs to be cached during installation
 * 
 * Events:
 * @event install - Fired when the Service Worker is being installed (first time or on update)
 * @event fetch - Fired whenever the web app makes a network request
 * @event sync - Fired when network connection is restored and browser wants to sync data
 *               The 'sync-demo' tag event is triggered when navigator.serviceWorker.ready.then(registration => registration.sync.register('sync-demo'))
 *               is called from the web app
 */

const CACHE_NAME = 'service-worker-cache';
const urlsToCache = [
    //'./',
    //'./index.html',
    './styles.css',
    //'./script.js',
    './index.js',
    //'./installation.js',
    //'./notification.js',
    //'./background-fetch.js',
    //'./background-sync.js',
    //'./cache.js',
    //'./online-offline-status.js',
    //'./service-worker.js',
    //'./load-service-worker.js',
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
            fetch('./index.html')
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