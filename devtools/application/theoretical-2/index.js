window.addEventListener("load", function () {

    // installation
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        const installButton = document.getElementById('installButton');
        const installStatus = document.getElementById('installStatus');
        installButton.classList.remove('hidden');
        installStatus.textContent = 'App is ready to install!';
    });

    document.getElementById('installButton').addEventListener('click', async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const result = await deferredPrompt.userChoice;
        if (result.outcome === 'accepted') {
            document.getElementById('installStatus').textContent = 'App installed successfully!';
        } else {
            document.getElementById('installStatus').textContent = 'App installation declined';
        }
        deferredPrompt = null;
    });

    // notification
    document.getElementById('notifyButton').addEventListener('click', async () => {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                document.getElementById('notifyButton').disabled = true;
                document.getElementById('sendNotification').disabled = false;
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    });

    document.getElementById('sendNotification').addEventListener('click', () => {
        try {
            new Notification('Test Notification', {
                body: 'This is a test notification from the PWA',
                icon: '/static/favicon.png'
            });
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    });

    // offline support
    document.getElementById('cacheButton').addEventListener('click', async () => {
        try {
            const cache = await caches.open('app-cache-v1');
            await cache.add(window.location.href);
            alert('Page cached successfully!');
        } catch (error) {
            console.error('Error caching page:', error);
            alert('Failed to cache page');
        }
    });

    // background sync
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

// Check if the page is served from cache
window.addEventListener('load', async () => {
    const cache = await caches.open('app-cache-v1');
    const cachedResponse = await cache.match(window.location.href);
    if (cachedResponse) {
        console.log('Page served from cache');
    }
});