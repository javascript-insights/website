self.addEventListener('push', function (event) {
    console.log('Push event received!');

    let title = '📬 Push Notification';
    let body = 'No payload received';

    if (event.data) {
        try {
            // Try to parse as JSON first
            const data = event.data.json();
            title = data.title || title;
            body = data.body || data.message || JSON.stringify(data);
        } catch (e) {
            // Fall back to plain text
            body = event.data.text();
        }
    }

    const options = {
        body: body,
        tag: 'push-' + Date.now(),
        data: { url: self.registration.scope },
        vibrate: [100, 50, 100],
        actions: [
            { action: 'open', title: 'Open App' },
            { action: 'dismiss', title: 'Dismiss' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(title, options).then(() => {
            // Notify clients about the push event
            return self.clients.matchAll({ type: 'window' }).then(clients => {
                clients.forEach(client => {
                    client.postMessage({
                        type: 'push-received',
                        title: title,
                        body: body,
                        timestamp: Date.now()
                    });
                });
            });
        })
    );
});

self.addEventListener('notificationclick', function (event) {
    const notification = event.notification;
    console.log('Push notification clicked:', notification.title);
    notification.close();

    const urlToOpen = notification.data?.url || self.registration.scope;

    event.waitUntil(
        self.clients.matchAll({ type: 'window' }).then(clients => {
            // Post message to clients about the click
            clients.forEach(client => {
                client.postMessage({
                    type: 'push-notification-clicked',
                    title: notification.title,
                    action: event.action || 'default',
                    timestamp: Date.now()
                });
            });

            // Focus existing client or open new window
            const matchingClient = clients.find(c => c.url.includes(urlToOpen));
            if (matchingClient) {
                return matchingClient.focus();
            } else if (clients.length > 0) {
                return clients[0].focus();
            }
            return self.clients.openWindow(urlToOpen);
        })
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