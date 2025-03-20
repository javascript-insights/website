self.addEventListener('install', event => {
    console.log('Service Worker installing.');
});

self.addEventListener('activate', event => {
    console.log('Service Worker activated.');
});

self.addEventListener('backgroundfetchsuccess', event => {
    const bgFetch = event.registration;
    event.waitUntil(async function () {
        try {
            const records = await bgFetch.matchAll();
            const promises = records.map(async record => {
                const response = await record.responseReady;
                // Process the response as needed
                console.log('Background Fetch succeeded:', response);
            });
            await Promise.all(promises);
            // Update UI or show notification
            event.updateUI({ title: 'Download complete!' });
        } catch (err) {
            console.error('Background Fetch failed:', err);
        }
    }());
});

self.addEventListener('backgroundfetchfail', event => {
    console.error('Background Fetch failed:', event);
});

self.addEventListener('backgroundfetchabort', event => {
    console.log('Background Fetch aborted:', event);
});