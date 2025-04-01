window.addEventListener("load", function () {

    // installation - with and without cache
    ///////////////////////////////////////////////////////////////////////////
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

    document.getElementById('installButtonWithCache').addEventListener('click', async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const result = await deferredPrompt.userChoice;
        if (result.outcome === 'accepted') {
            try {
                const cache = await caches.open('app-install-cache-with-install-button-with-cache-theoretical-2');
                await cache.add('./styles.css');
                document.getElementById('installStatus').textContent = 'App installed and cached successfully!';
            } catch (error) {
                console.error('Error caching page:', error);
                document.getElementById('installStatus').textContent = 'App installed but caching failed';
            }
        } else {
            document.getElementById('installStatus').textContent = 'App installation declined';
        }
        deferredPrompt = null;
    });
});