// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.log('Service Worker registration failed:', error);
        });
}

// Notification feature (only if button exists on the page)
const notifyButton = document.getElementById('notifyButton');
if (notifyButton) {
    notifyButton.addEventListener('click', () => {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification('Hello! This is a notification.');
            }
        });
    });
}