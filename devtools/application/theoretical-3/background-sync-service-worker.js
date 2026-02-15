self.addEventListener('sync', function (event) {
    console.log('Sync event fired with tag:', event.tag);

    if (event.tag.startsWith('sync-messages') || event.tag === 'myFirstSync') {
        event.waitUntil(
            (async () => {
                try {
                    // Simulate a background data sync (use a real endpoint in production)
                    console.log('Performing background sync...');

                    // Simulate network request with a small delay
                    await new Promise(resolve => setTimeout(resolve, 500));
                    console.log('Background sync completed successfully!');

                    // Notify the client that sync is complete
                    const clients = await self.clients.matchAll();
                    clients.forEach(client => {
                        client.postMessage({ type: 'sync-complete', tag: event.tag });
                    });
                } catch (error) {
                    console.error('Sync failed:', error);
                    throw error; // This will cause the browser to retry the sync
                }
            })()
        );
    }
});

self.addEventListener('install', (event) => {
    console.log('Background Sync Service Worker installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Background Sync Service Worker activated');
    event.waitUntil(self.clients.claim());
});