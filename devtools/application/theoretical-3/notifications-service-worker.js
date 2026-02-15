self.addEventListener('install', event => {
    console.log('Notifications Service Worker installed');
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('Notifications Service Worker activated');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    const notifData = notification.data || {};
    console.log('Notification clicked:', notification.title, 'tag:', notification.tag);
    notification.close();

    // Notify the page about the click event so the UI log updates
    event.waitUntil(
        self.clients.matchAll({ type: 'window' }).then(clients => {
            // Post message to all clients so the page log updates
            clients.forEach(client => {
                client.postMessage({
                    type: 'notification-clicked',
                    title: notification.title,
                    tag: notification.tag,
                    timestamp: Date.now()
                });
            });

            // Focus the existing window or open a new one
            const urlToOpen = notifData.url || self.location.origin;
            const matchingClient = clients.find(c => c.url === urlToOpen);
            if (matchingClient) {
                return matchingClient.focus();
            } else if (clients.length > 0) {
                return clients[0].focus();
            }
            return self.clients.openWindow(urlToOpen);
        })
    );
});

self.addEventListener('notificationclose', event => {
    const notification = event.notification;
    console.log('Notification closed:', notification.title, 'tag:', notification.tag);

    // Notify the page about the close event
    event.waitUntil(
        self.clients.matchAll({ type: 'window' }).then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'notification-closed',
                    title: notification.title,
                    tag: notification.tag,
                    timestamp: Date.now()
                });
            });
        })
    );
});