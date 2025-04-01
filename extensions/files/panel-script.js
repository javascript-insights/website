// Script for the DevTools panel

document.addEventListener('DOMContentLoaded', function () {
    const analyzeButton = document.getElementById('analyze-btn');
    const clearButton = document.getElementById('clear-btn');
    const metricsDiv = document.getElementById('metrics');
    const scriptListDiv = document.getElementById('script-list');

    // Function to analyze the scripts on the page
    function analyzeScripts() {
        // Access the inspected window
        chrome.devtools.inspectedWindow.eval(
            `(function() {
        const scripts = document.querySelectorAll('script');
        const scriptData = [];
        let totalSize = 0;
        
        scripts.forEach((script, index) => {
          const isExternal = !!script.src;
          const size = isExternal ? 'Unknown' : script.textContent.length;
          if (!isExternal) {
            totalSize += size;
          }
          
          scriptData.push({
            index: index,
            src: script.src || 'Inline script',
            type: script.type || 'text/javascript',
            isExternal: isExternal,
            size: size
          });
        });
        
        return {
          scriptCount: scripts.length,
          inlineCount: scriptData.filter(s => !s.isExternal).length,
          externalCount: scriptData.filter(s => s.isExternal).length,
          totalSize: totalSize,
          scripts: scriptData
        };
      })()`,
            function (result, isException) {
                if (isException) {
                    console.error('Error analyzing scripts:', isException);
                    return;
                }

                displayResults(result);
            }
        );
    }

    // Function to display analysis results
    function displayResults(data) {
        // Update metrics panel
        metricsDiv.innerHTML = `
      <h3>Page Metrics</h3>
      <p><strong>Total Scripts:</strong> ${data.scriptCount}</p>
      <p><strong>Inline Scripts:</strong> ${data.inlineCount}</p>
      <p><strong>External Scripts:</strong> ${data.externalCount}</p>
      <p><strong>Total Inline Script Size:</strong> ${Math.round(data.totalSize / 1024)} KB</p>
    `;

        // Update script list
        if (data.scripts && data.scripts.length > 0) {
            let listHTML = '';
            data.scripts.forEach(script => {
                listHTML += `
          <div class="script-item">
            <div><strong>Source:</strong> ${script.src}</div>
            <div><strong>Type:</strong> ${script.type}</div>
            <div><strong>Size:</strong> ${script.isExternal ? 'External (size unknown)' : script.size + ' bytes'}</div>
          </div>
        `;
            });
            scriptListDiv.innerHTML = listHTML;
        } else {
            scriptListDiv.innerHTML = '<p>No scripts found on this page.</p>';
        }
    }

    // Handle analyze button click
    analyzeButton.addEventListener('click', analyzeScripts);

    // Handle clear button click
    clearButton.addEventListener('click', function () {
        metricsDiv.innerHTML = `
      <h3>Page Metrics</h3>
      <p>Click "Analyze Scripts" to gather information about JavaScript on this page.</p>
    `;
        scriptListDiv.innerHTML = '<p>No scripts analyzed yet.</p>';
    });

    // Initial analysis when panel is opened
    analyzeScripts();
});
