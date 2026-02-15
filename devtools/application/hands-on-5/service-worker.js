// Service Worker for Hands-On 5: Background Services
// This SW handles Push, Sync, Periodic Sync, and Notifications

const CACHE_NAME = 'hands-on-5-v1';

// Install
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');
    self.skipWaiting();
});

// Activate
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');
    event.waitUntil(clients.claim());
});

// Background Sync
self.addEventListener('sync', (event) => {
    console.log('[SW] Sync event fired:', event.tag);

    event.waitUntil(
        (async () => {
            // Simulate sending data
            console.log(`[SW] Processing sync tag: ${event.tag}`);
            await new Promise(resolve => setTimeout(resolve, 500));
            console.log(`[SW] Sync completed: ${event.tag}`);

            // Notify the page
            const allClients = await clients.matchAll();
            allClients.forEach(client => {
                client.postMessage({
                    type: 'sync-complete',
                    tag: event.tag,
                    timestamp: Date.now()
                });
            });
        })()
    );
});

// Periodic Background Sync
self.addEventListener('periodicsync', (event) => {
    console.log('[SW] Periodic sync event:', event.tag);

    event.waitUntil(
        (async () => {
            console.log(`[SW] Periodic sync processing: ${event.tag}`);
            await new Promise(resolve => setTimeout(resolve, 300));
            console.log(`[SW] Periodic sync done: ${event.tag}`);
        })()
    );
});

// Push
self.addEventListener('push', (event) => {
    console.log('[SW] Push event received');

    let data = { title: 'Push Notification', body: 'New push message!' };
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    event.waitUntil(
        self.registration.showNotification(data.title || 'Push', {
            body: data.body || '',
            data: { url: self.registration.scope }
        })
    );
});

// Notification Click
self.addEventListener('notificationclick', (event) => {
    console.log('[SW] Notification clicked:', event.notification.tag || '(no tag)');
    event.notification.close();

    const url = event.notification.data?.url || self.registration.scope;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes('hands-on-5') && 'focus' in client) {
                    return client.focus();
                }
            }
            return clients.openWindow(url);
        })
    );
});

// Notification Close
self.addEventListener('notificationclose', (event) => {
    console.log('[SW] Notification closed:', event.notification.tag || '(no tag)');
});

// Fetch (passthrough, for caching exercises)
self.addEventListener('fetch', (event) => {
    // Simply pass through - this SW is for background services demos
    event.respondWith(fetch(event.request));
});
