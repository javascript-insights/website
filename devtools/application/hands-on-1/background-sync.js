window.addEventListener("load", function () {
});

// background sync
///////////////////////////////////////////////////////////////////////////
let registerBackgroundSync = async () => {
    try {
        // Check if service worker and background sync are supported
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
            const registration = await navigator.serviceWorker.ready;
            await registration.sync.register('sync-demo');
            document.getElementById('syncStatus').textContent = 'Sync scheduled';
        } else {
            document.getElementById('syncStatus').textContent = 'Background Sync not supported';
        }
    } catch (error) {
        console.error('Error scheduling sync:', error);
        document.getElementById('syncStatus').textContent = 'Failed to schedule sync';
    }
}