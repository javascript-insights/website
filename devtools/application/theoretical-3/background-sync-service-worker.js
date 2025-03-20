self.addEventListener('sync', function (event) {
    if (event.tag === 'myFirstSync') {
        event.waitUntil(
            // Simulate data sync with a fetch request
            fetch('/api/data')
                .then(response => {
                    console.log('Sync successful');
                })
                .catch(error => {
                    console.error('Sync failed:', error);
                    throw error; // Retry sync later
                })
        );
    }
});

self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
});