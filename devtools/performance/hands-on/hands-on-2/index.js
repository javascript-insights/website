// Task: Optimize the performance of the page by making the following changes:

// 1. Lazy load images to improve initial load time.
// 2. Minimize the number of network requests by combining files where possible.
// 3. Use asynchronous loading for non-critical scripts.

// Example: Lazy loading an image
document.addEventListener("DOMContentLoaded", function () {
    const img = document.createElement('img');
    img.src = 'path/to/large-image.jpg';
    img.loading = 'lazy';
    document.body.appendChild(img);
});

// Example: Asynchronous loading of a script
const script = document.createElement('script');
script.src = 'path/to/non-critical-script.js';
script.async = true;
document.head.appendChild(script);

document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const triggerClsBtn = document.getElementById('trigger-cls');
    const triggerFixedClsBtn = document.getElementById('trigger-fixed-cls');
    const showSolutionBtn = document.getElementById('show-solution');
    const solutionCode = document.getElementById('solution-code');
    const lateAd = document.getElementById('late-ad');
    const optimalAd = document.getElementById('optimal-ad');
    const resultsPanel = document.getElementById('cls-results');
    const clsValues = document.getElementById('cls-values');
    const demoText = document.getElementById('demo-text');

    // Track CLS values
    let clsScore = 0;
    let clsEntries = [];

    // Observe layout shifts
    const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
            // Only count layout shifts without recent user input
            if (!entry.hadRecentInput) {
                clsScore += entry.value;
                clsEntries.push({
                    value: entry.value.toFixed(4),
                    time: new Date().toLocaleTimeString(),
                    elements: entry.sources ? entry.sources.map(source =>
                        source.node ? source.node.nodeName.toLowerCase() : 'unknown'
                    ).join(', ') : 'unknown'
                });

                updateClsDisplay();

                // Log details to console
                console.log('Layout shift:', entry);
                console.log('CLS score so far:', clsScore.toFixed(4));

                // Highlight affected elements if possible
                if (entry.sources) {
                    entry.sources.forEach(source => {
                        if (source.node) {
                            highlightElement(source.node);
                        }
                    });
                }
            }
        }
    });

    // Start observing
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // Trigger the problematic layout shift
    triggerClsBtn.addEventListener('click', () => {
        // Show the late-loading ad which will cause a layout shift
        setTimeout(() => {
            lateAd.style.display = 'block';
            highlightElement(demoText);
        }, 500);
    });

    // Trigger the fixed layout with no shift
    triggerFixedClsBtn.addEventListener('click', () => {
        // Show the optimized ad which won't cause a layout shift
        setTimeout(() => {
            optimalAd.style.display = 'block';
        }, 500);
    });

    // Show solution code
    showSolutionBtn.addEventListener('click', () => {
        if (solutionCode.style.display === 'none') {
            solutionCode.style.display = 'block';
            showSolutionBtn.textContent = 'Hide Solution';
        } else {
            solutionCode.style.display = 'none';
            showSolutionBtn.textContent = 'Show Solution';
        }
    });

    // Helper function to highlight elements affected by layout shift
    function highlightElement(element) {
        element.classList.add('cls-highlight');
        setTimeout(() => {
            element.classList.remove('cls-highlight');
        }, 1000);
    }

    // Update the CLS display with current values
    function updateClsDisplay() {
        resultsPanel.style.display = 'block';

        let scoreColor = '#4CAF50'; // Green by default
        if (clsScore > 0.1 && clsScore <= 0.25) {
            scoreColor = '#FFC107'; // Yellow for needs improvement
        } else if (clsScore > 0.25) {
            scoreColor = '#F44336'; // Red for poor
        }

        let entriesHTML = '';
        clsEntries.forEach((entry, index) => {
            entriesHTML += `
                <div class="cls-entry">
                    <p><strong>Shift #${index + 1}</strong> at ${entry.time}</p>
                    <p>Value: <span style="color:${entry.value > 0.05 ? '#F44336' : '#4CAF50'}">${entry.value}</span></p>
                    <p>Elements: ${entry.elements}</p>
                </div>
            `;
        });

        clsValues.innerHTML = `
            <p><i class="fas fa-tachometer-alt"></i> Current CLS Score: 
                <span style="color:${scoreColor};font-weight:bold;">${clsScore.toFixed(4)}</span>
            </p>
            <p>
                <span style="display:inline-block;width:12px;height:12px;background-color:#4CAF50;border-radius:50%;"></span> Good: 0 - 0.1
                <span style="display:inline-block;width:12px;height:12px;background-color:#FFC107;border-radius:50%;margin-left:10px;"></span> Needs Improvement: 0.1 - 0.25
                <span style="display:inline-block;width:12px;height:12px;background-color:#F44336;border-radius:50%;margin-left:10px;"></span> Poor: > 0.25
            </p>
            <h5>Recorded Layout Shifts:</h5>
            ${entriesHTML}
        `;
    }

    // Additional educational features with colored console logs
    console.log('%c📊 Welcome to the CLS Performance Lab!', 'font-size: 16px; font-weight: bold; color: #4CAF50;');
    console.log('%c🔍 Open the Performance tab in DevTools and watch for layout shifts.', 'color: #2196F3;');
    console.log('%c💡 Tip: Layout shifts are shown as red markers in the Experience section.', 'color: #FF9800;');
    console.log('%c📈 A good CLS score is under 0.1.', 'color: #4CAF50;');

    // Automatically trigger small layout shift after 3 seconds to demonstrate
    setTimeout(() => {
        const demoDiv = document.querySelector('.cls-example');
        if (demoDiv) {
            const paragraph = document.createElement('p');
            paragraph.textContent = 'This text was inserted dynamically and might cause a small layout shift!';
            paragraph.style.color = '#F44336';
            demoDiv.appendChild(paragraph);
        }
    }, 3000);
});