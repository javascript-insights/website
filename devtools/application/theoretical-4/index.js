document.addEventListener('DOMContentLoaded', () => {
  const populateButton = document.getElementById('populateCache');
  const matchButton = document.getElementById('matchCache');
  const updateButton = document.getElementById('updateCache');
  const deleteItemButton = document.getElementById('deleteFromCache');
  const clearButton = document.getElementById('clearCache');
  const statusDisplay = document.getElementById('cacheStatus');
  const resultDisplay = document.getElementById('cacheResult');
  const CACHE_NAME = 'js-insights-demo-cache';

  // Resources to cache
  const resourcesToCache = [
    '/styles.css',
    './styles.css',
    '/static/favicon.png',
    'https://picsum.photos/200/300?random=1',
    'https://picsum.photos/200/300?random=2'
  ];

  // Check if Cache API is supported
  if (!('caches' in window)) {
    statusDisplay.textContent = 'Cache API is not supported in this browser';
    populateButton.disabled = true;
    clearButton.disabled = true;
    return;
  }

  // Initialize by checking if our cache exists
  caches.has(CACHE_NAME).then(exists => {
    statusDisplay.textContent = exists ?
      'Cache status: exists' :
      'Cache status: not created yet';
  });

  // Populate cache with resources
  populateButton.addEventListener('click', async () => {
    try {
      statusDisplay.textContent = 'Creating cache...';
      resultDisplay.innerHTML = '';

      const cache = await caches.open(CACHE_NAME);

      // Add all resources to cache
      await Promise.all(
        resourcesToCache.map(url =>
          fetch(url).then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch ${url}`);
            }
            return cache.put(url, response);
          })
        )
      );

      statusDisplay.textContent = `Cache populated with ${resourcesToCache.length} resources!`;

      // Show cached items
      const keys = await cache.keys();
      const keyList = await Promise.all(keys.map(req => req.url));
      resultDisplay.innerHTML = `<p>Cached URLs:</p><ul>${keyList.map(url => `<li>${url}</li>`).join('')}</ul>`;
    } catch (error) {
      console.error('Cache population error:', error);
      statusDisplay.textContent = `Error: ${error.message}`;
    }
  });

  // Match and fetch from cache
  matchButton.addEventListener('click', async () => {
    try {
      statusDisplay.textContent = 'Fetching from cache...';
      resultDisplay.innerHTML = '';

      const cache = await caches.open(CACHE_NAME);

      // Create an image element to display cached image
      const imgUrl = 'https://picsum.photos/200/300?random=1';
      const cachedResponse = await cache.match(imgUrl);

      if (cachedResponse) {
        const blob = await cachedResponse.blob();
        const imgUrl = URL.createObjectURL(blob);

        resultDisplay.innerHTML = `
          <p>Resource fetched from cache: ${cachedResponse.url}</p>
          <img src="${imgUrl}" alt="Cached image" style="max-width: 200px;">
          <p>Check Network tab to verify the request didn't hit the network!</p>
        `;
        statusDisplay.textContent = 'Resource successfully retrieved from cache!';
      } else {
        resultDisplay.innerHTML = '<p>No matching resource found in cache</p>';
        statusDisplay.textContent = 'Cache miss - resource not found';
      }
    } catch (error) {
      console.error('Cache match error:', error);
      statusDisplay.textContent = `Error: ${error.message}`;
    }
  });

  // Update an item in the cache
  updateButton.addEventListener('click', async () => {
    try {
      statusDisplay.textContent = 'Updating cache...';
      resultDisplay.innerHTML = '';

      const cache = await caches.open(CACHE_NAME);

      // Fetch a new image with a cache-busting parameter
      const imgUrl = 'https://picsum.photos/200/300?random=3';
      const response = await fetch(imgUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch new resource for update');
      }

      // Update the first cached image with this new one
      await cache.put('https://picsum.photos/200/300?random=1', response);

      statusDisplay.textContent = 'Cache entry updated successfully!';
      resultDisplay.innerHTML = `
        <p>Updated cache entry for: https://picsum.photos/200/300?random=1</p>
        <p>Check the Application panel to see the updated cache entry</p>
      `;
    } catch (error) {
      console.error('Cache update error:', error);
      statusDisplay.textContent = `Error: ${error.message}`;
    }
  });

  // Delete an item from cache
  deleteItemButton.addEventListener('click', async () => {
    try {
      statusDisplay.textContent = 'Deleting item from cache...';
      resultDisplay.innerHTML = '';

      const cache = await caches.open(CACHE_NAME);

      // Delete one specific item
      const deleted = await cache.delete('https://picsum.photos/200/300?random=2');

      if (deleted) {
        statusDisplay.textContent = 'Cache item successfully deleted!';

        // Show remaining cached items
        const keys = await cache.keys();
        const keyList = await Promise.all(keys.map(req => req.url));
        resultDisplay.innerHTML = `
          <p>Item deleted. Remaining cached URLs:</p>
          <ul>${keyList.map(url => `<li>${url}</li>`).join('')}</ul>
        `;
      } else {
        statusDisplay.textContent = 'Cache item not found or already deleted.';
        resultDisplay.innerHTML = '<p>Could not delete item - not found in cache</p>';
      }
    } catch (error) {
      console.error('Cache item deletion error:', error);
      statusDisplay.textContent = `Error: ${error.message}`;
    }
  });

  // Clear the entire cache
  clearButton.addEventListener('click', async () => {
    try {
      statusDisplay.textContent = 'Clearing cache...';
      resultDisplay.innerHTML = '';

      const deleted = await caches.delete(CACHE_NAME);

      if (deleted) {
        statusDisplay.textContent = 'Cache successfully cleared!';
        resultDisplay.innerHTML = '<p>All cache entries have been removed</p>';
      } else {
        statusDisplay.textContent = 'Cache not found or already deleted.';
      }
    } catch (error) {
      console.error('Cache deletion error:', error);
      statusDisplay.textContent = `Error: ${error.message}`;
    }
  });
});