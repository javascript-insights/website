// Push event
self.addEventListener('push', event => {
    event.waitUntil(fetchData(event.data.text()));
});

// Sync event
self.addEventListener('sync', event => {
    event.waitUntil(fetchData(event.tag));
});

// Periodic Sync event
self.addEventListener('periodicsync', event => {
    event.waitUntil(fetchData(event.tag));
});

function fetchData(message) {
    return fetch('./getstarted.json' + '#message=' + message)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Fetch error:', error));
}