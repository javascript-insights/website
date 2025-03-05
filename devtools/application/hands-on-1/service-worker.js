self.addEventListener('sync', event => {
    if (event.tag === 'sync-demo') {
        event.waitUntil(
            // Perform your background sync operation here
            fetch('./index.html')
                .then(response => {
                    if (!response.ok) throw Error('Sync failed');
                    console.log('Background sync successful');
                })
                .catch(err => {
                    console.error('Background sync failed:', err);
                })
        );
    }
});