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
    event.waitUntil(
        clients.openWindow('https://your-website-url.com') // Replace with your desired URL
    );
});