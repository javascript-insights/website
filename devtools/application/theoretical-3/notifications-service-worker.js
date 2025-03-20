self.addEventListener('install', event => {
    console.log('Service Worker installed');
});

self.addEventListener('activate', event => {
    console.log('Service Worker activated');
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    // You can add custom click handling here
    console.log('Notification clicked');
});

self.addEventListener('notificationclose', event => {
    console.log('Notification closed');
});