self.addEventListener('install', event => {
    console.log('Notifications Service Worker installed');
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('Notifications Service Worker activated');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    // You can add custom click handling here
    console.log('Notification clicked');
});

self.addEventListener('notificationclose', event => {
    console.log('Notification closed');
});