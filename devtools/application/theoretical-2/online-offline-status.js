window.addEventListener("load", function () {

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