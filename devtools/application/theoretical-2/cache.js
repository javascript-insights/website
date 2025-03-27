window.addEventListener('load', async () => {
    const cacheName = 'cache-button-theoretical-2';
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