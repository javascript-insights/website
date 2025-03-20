
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'example-sync') {
        event.waitUntil(
            (async () => {
                try {
                    // Perform your background sync operation here
                    console.log('Periodic background sync executed');

                    // Example: fetch some data
                    const response = await fetch('https://api.example.com/data');
                    const data = await response.json();

                    // Process the data...
                } catch (error) {
                    console.error('Periodic background sync failed:', error);
                }
            })()
        );
    }
});

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://example.com')
    );
});