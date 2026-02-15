const CACHE_NAME = 'theoretical-3-v1';

self.addEventListener('install', event => {
    console.log('Main Service Worker installing.');
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('Main Service Worker activating.');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    // Log fetch events for DevTools visibility
    console.log('Fetching:', event.request.url);
});
