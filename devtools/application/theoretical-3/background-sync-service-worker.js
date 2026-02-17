// 1. Handle sync events from the browser
self.addEventListener('sync', event => {
    console.log('Sync fired:', event.tag);

    event.waitUntil(
        // Simulate a network request (replace with real fetch in production)
        new Promise(resolve => setTimeout(resolve, 500))
            .then(() => self.clients.matchAll())
            .then(clients => {
                // Notify all open tabs that sync is done
                clients.forEach(c => c.postMessage({ type: 'sync-complete', tag: event.tag }));
                console.log('Sync complete!');
            })
        // If this promise rejects, the browser will retry the sync automatically
    );
});

// 2. Install & activate immediately
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));