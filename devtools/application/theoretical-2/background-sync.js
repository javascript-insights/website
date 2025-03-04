window.addEventListener("load", function () {

    // background sync
    ///////////////////////////////////////////////////////////////////////////
    document.getElementById('syncButton').addEventListener('click', async () => {
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
    });

    // Update online/offline status
    ///////////////////////////////////////////////////////////////////////////
    function updateOnlineStatus() {
        const indicator = document.getElementById('onlineIndicator');
        const text = document.getElementById('connectionText');
        if (navigator.onLine) {
            indicator.style.color = 'green';
            text.textContent = 'Online';
        } else {
            indicator.style.color = 'red';
            text.textContent = 'Offline';
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
});

window.addEventListener('load', async () => {
    const cacheName = 'app-cache-with-cache-button';
    // offline support - caching window.location.href on button click
    ///////////////////////////////////////////////////////////////////////////
    document.getElementById('cacheButton').addEventListener('click', async () => {
        try {
            const cache = await caches.open(cacheName);
            await cache.add(window.location.href);
            alert('Page cached successfully!');
        } catch (error) {
            console.error('Error caching page:', error);
            alert('Failed to cache page');
        }
    });

    // Check if the page is served from cache
    ///////////////////////////////////////////////////////////////////////////
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(window.location.href);
    if (cachedResponse) {
        console.log('Page served from cache');
    }
});