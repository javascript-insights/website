
self.addEventListener('periodicsync', (event) => {
    console.log('Periodic sync event fired with tag:', event.tag);

    if (event.tag === 'content-sync' || event.tag === 'example-sync') {
        event.waitUntil(
            (async () => {
                try {
                    console.log('Performing periodic background sync...');

                    // Simulate a periodic content update
                    // In production, you'd fetch new articles, sync data, etc.
                    await new Promise(resolve => setTimeout(resolve, 300));

                    console.log('Periodic background sync completed successfully!');

                    // Notify clients about the sync
                    const allClients = await self.clients.matchAll();
                    allClients.forEach(client => {
                        client.postMessage({
                            type: 'periodic-sync-complete',
                            tag: event.tag,
                            timestamp: Date.now()
                        });
                    });
                } catch (error) {
                    console.error('Periodic background sync failed:', error);
                }
            })()
        );
    }
});

self.addEventListener('install', (event) => {
    console.log('Periodic Sync Service Worker installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Periodic Sync Service Worker activated');
    event.waitUntil(self.clients.claim());
});