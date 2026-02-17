// --- Setup ---
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

// Send a message to all open pages
async function notifyClients(type, id) {
    const clients = await self.clients.matchAll();
    clients.forEach(c => c.postMessage({ type, id }));
}

// --- Background Fetch Events ---

// Success: all resources downloaded → save them to Cache Storage
self.addEventListener('backgroundfetchsuccess', event => {
    event.waitUntil((async () => {
        const cache = await caches.open('bg-fetch-downloads');
        const records = await event.registration.matchAll();
        // Store each response in the cache (visible in DevTools → Application → Cache Storage)
        for (const record of records) {
            const response = await record.responseReady;
            await cache.put(record.request, response);
        }
        event.updateUI({ title: '✅ Download complete!' });
        await notifyClients('bgfetch-success', event.registration.id);
    })());
});

// Failure: one or more resources failed
self.addEventListener('backgroundfetchfail', event => {
    event.waitUntil((async () => {
        event.updateUI({ title: '❌ Download failed' });
        await notifyClients('bgfetch-fail', event.registration.id);
    })());
});

// Abort: user or code cancelled the fetch
self.addEventListener('backgroundfetchabort', event => {
    event.waitUntil(notifyClients('bgfetch-abort', event.registration.id));
});

// Click: user tapped the browser download notification
self.addEventListener('backgroundfetchclick', event => {
    event.waitUntil(
        self.clients.matchAll({ type: 'window' }).then(clients =>
            clients.length ? clients[0].focus() : self.clients.openWindow('./')
        )
    );
});