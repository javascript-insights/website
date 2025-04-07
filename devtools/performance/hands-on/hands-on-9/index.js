window.addEventListener("load", function () {
    // Check if DevTools is open and show a hint if not
    setTimeout(() => {
        if (!window.devToolsOpen) {
            const result = document.getElementById('result');
            if (result && result.innerHTML.includes('Click the buttons')) {
                result.innerHTML += '<p><strong>Tip:</strong> Open DevTools (F12) and go to the Performance panel to see results!</p>';
            }
        }
    }, 3000);

    // Try to detect if DevTools is open
    const devToolsDetection = /./;
    devToolsDetection.toString = function () {
        window.devToolsOpen = true;
        return 'Dev tools detected';
    };
    console.log('%c', devToolsDetection);

    // Add a helpful console message
    console.log(
        '%cCSS Selector Performance Demo',
        'font-size: 18px; font-weight: bold; color: #3498db;'
    );
    console.log(
        '%cClick buttons in the UI and analyze "Recalculate Style" events in the Performance panel',
        'font-size: 14px; color: #333;'
    );
});