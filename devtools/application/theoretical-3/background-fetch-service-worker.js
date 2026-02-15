self.addEventListener('install', event => {
    console.log('Background Fetch Service Worker installing.');
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('Background Fetch Service Worker activated.');
    event.waitUntil(self.clients.claim());
});

// Notify all clients about background fetch events
async function notifyClients(type, data) {
    const allClients = await self.clients.matchAll();
    allClients.forEach(client => {
        client.postMessage({ type, ...data });
    });
}

self.addEventListener('backgroundfetchsuccess', event => {
    const bgFetch = event.registration;
    console.log('Background Fetch succeeded! ID:', bgFetch.id);

    event.waitUntil((async () => {
        try {
            const records = await bgFetch.matchAll();
            const promises = records.map(async record => {
                const response = await record.responseReady;
                console.log('Background Fetch resource ready:', response.url, 'status:', response.status);
            });
            await Promise.all(promises);

            // Update the browser UI (shown in download notification)
            event.updateUI({ title: '✅ Download complete!' });

            // Notify the page so the UI can update
            await notifyClients('bgfetch-success', {
                id: bgFetch.id,
                recordCount: records.length
            });
        } catch (err) {
            console.error('Error processing Background Fetch results:', err);
        }
    })());
});

self.addEventListener('backgroundfetchfail', event => {
    const bgFetch = event.registration;
    console.error('Background Fetch failed! ID:', bgFetch.id, 'Reason:', bgFetch.failureReason);

    event.waitUntil((async () => {
        event.updateUI({ title: '❌ Download failed' });
        await notifyClients('bgfetch-fail', {
            id: bgFetch.id,
            reason: bgFetch.failureReason
        });
    })());
});

self.addEventListener('backgroundfetchabort', event => {
    const bgFetch = event.registration;
    console.log('Background Fetch aborted! ID:', bgFetch.id);

    event.waitUntil(
        notifyClients('bgfetch-abort', { id: bgFetch.id })
    );
});

self.addEventListener('backgroundfetchclick', event => {
    const bgFetch = event.registration;
    console.log('Background Fetch notification clicked! ID:', bgFetch.id);

    event.waitUntil(
        self.clients.matchAll({ type: 'window' }).then(clients => {
            if (clients.length > 0) {
                clients[0].focus();
            } else {
                self.clients.openWindow('./');
            }
        })
    );
});