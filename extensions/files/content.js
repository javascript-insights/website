// Content script for JavaScript Insights extension

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'analyze') {
        // Analyze the scripts on the page
        const scriptElements = document.querySelectorAll('script');

        let scriptCount = scriptElements.length;
        let inlineCount = 0;
        let externalCount = 0;
        let totalSize = 0;

        // Analyze each script element
        scriptElements.forEach(script => {
            if (script.src) {
                // External script
                externalCount++;
            } else {
                // Inline script
                inlineCount++;
                totalSize += script.textContent.length;
            }
        });

        // Send results back to popup
        sendResponse({
            scriptCount: scriptCount,
            inlineCount: inlineCount,
            externalCount: externalCount,
            totalSize: totalSize,
            timestamp: new Date().toISOString()
        });

        // Also send to background for storage
        chrome.runtime.sendMessage({
            action: 'storeData',
            data: {
                scriptCount: scriptCount,
                inlineCount: inlineCount,
                externalCount: externalCount,
                totalSize: totalSize,
                url: window.location.href,
                timestamp: new Date().toISOString()
            }
        });
    }

    return true; // Indicates we want to send a response asynchronously
});

// Log when content script is injected
console.log('JavaScript Insights content script loaded');
