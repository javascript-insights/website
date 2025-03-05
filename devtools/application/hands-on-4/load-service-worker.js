window.addEventListener("load", function () {
    // Register the service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }

    // // One-time sync
    // navigator.serviceWorker.ready.then(async registration => {
    //     try {
    //         await registration.sync.register('send-message');
    //     } catch (err) {
    //         console.log('Sync registration failed:', err);
    //     }
    // });

    // // Periodic sync
    // navigator.serviceWorker.ready.then(async registration => {
    //     try {
    //         await registration.periodicSync.register('update-content', {
    //             minInterval: 24 * 60 * 60 * 1000 // 24 hours in ms
    //         });
    //     } catch (err) {
    //         console.log('Periodic Sync registration failed:', err);
    //     }
    // });
});
