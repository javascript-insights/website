self.addEventListener('push', function (event) {
    let options = {
        body: event.data ? event.data.text() : 'No payload',
        icon: 'icon.png', // Path to an icon image
        badge: 'badge.png' // Path to a badge image
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    const urlToOpen = event.notification.data?.url || self.location.origin;
    event.waitUntil(
        clients.openWindow(urlToOpen)
    );
});

self.addEventListener('install', (event) => {
    console.log('Push Messaging Service Worker installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Push Messaging Service Worker activated');
    event.waitUntil(self.clients.claim());
});