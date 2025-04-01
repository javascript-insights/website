document.addEventListener('DOMContentLoaded', function () {
    const analyzeButton = document.getElementById('analyze-btn');
    const clearButton = document.getElementById('clear-btn');
    const metricsContainer = document.getElementById('metrics-container');

    // Handle analyze button click
    analyzeButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'analyze' }, function (response) {
                if (response && response.scriptCount) {
                    metricsContainer.innerHTML = `
            <p><strong>Scripts found:</strong> ${response.scriptCount}</p>
            <p><strong>Inline scripts:</strong> ${response.inlineCount}</p>
            <p><strong>External scripts:</strong> ${response.externalCount}</p>
            <p><strong>Total script size:</strong> ${Math.round(response.totalSize / 1024)} KB</p>
          `;

                    // Save data to storage
                    chrome.storage.local.set({
                        lastAnalysis: {
                            url: tabs[0].url,
                            data: response,
                            timestamp: new Date().toISOString()
                        }
                    });
                } else {
                    metricsContainer.innerHTML = '<p>Could not analyze page. Make sure JavaScript is enabled.</p>';
                }
            });
        });
    });

    // Handle clear button click
    clearButton.addEventListener('click', function () {
        chrome.storage.local.remove('lastAnalysis');
        metricsContainer.innerHTML = '<p>Data cleared. Click "Analyze Page Scripts" to begin</p>';
    });

    // Check if we have stored data
    chrome.storage.local.get('lastAnalysis', function (data) {
        if (data.lastAnalysis) {
            const analysis = data.lastAnalysis;
            metricsContainer.innerHTML = `
        <p><strong>Last analysis:</strong> ${new Date(analysis.timestamp).toLocaleString()}</p>
        <p><strong>URL:</strong> ${analysis.url}</p>
        <p><strong>Scripts found:</strong> ${analysis.data.scriptCount}</p>
        <p><strong>Total script size:</strong> ${Math.round(analysis.data.totalSize / 1024)} KB</p>
      `;
        }
    });
});
