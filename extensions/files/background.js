// Background service worker for JavaScript Insights extension

// Listen for installation
chrome.runtime.onInstalled.addListener(function (details) {
    console.log('JavaScript Insights extension installed');

    // Initialize storage with empty values
    chrome.storage.local.set({
        extensionEnabled: true,
        scriptData: {},
        lastAnalysis: null
    });
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'storeData') {
        chrome.storage.local.set({
            scriptData: request.data
        }, function () {
            sendResponse({ success: true });
        });
        return true; // Indicates we want to send a response asynchronously
    }

    if (request.action === 'getExtensionState') {
        chrome.storage.local.get('extensionEnabled', function (data) {
            sendResponse({ enabled: data.extensionEnabled });
        });
        return true; // Indicates we want to send a response asynchronously
    }
});
