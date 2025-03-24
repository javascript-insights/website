document.addEventListener('DOMContentLoaded', () => {
    const heroImage = document.getElementById('hero-image');
    const optimizeBtn = document.getElementById('optimize-btn');
    const resultsPanel = document.getElementById('optimization-results');

    let originalLCP = 0;
    let optimizedLCP = 0;
    let isOptimized = false;

    // Measure and log LCP
    const lcpObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP Element:', entry.element);
                console.log('LCP Time:', entry.startTime.toFixed(2), 'ms');

                if (!isOptimized) {
                    originalLCP = entry.startTime;
                    // Highlight the LCP element after a delay
                    setTimeout(() => {
                        if (entry.element) {
                            entry.element.classList.add('lcp-highlight');
                            // Remove highlight after 3 seconds
                            setTimeout(() => {
                                entry.element.classList.remove('lcp-highlight');
                            }, 3000);
                        }
                    }, 1000);
                } else {
                    optimizedLCP = entry.startTime;
                    showResults();
                }
            }
        }
    });

    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // Handle optimization button click
    optimizeBtn.addEventListener('click', function () {
        if (isOptimized) {
            // Reset to unoptimized state
            heroImage.src = 'large-image.png';
            this.innerHTML = 'Optimize LCP';
            resultsPanel.style.display = 'none';
            isOptimized = false;

            // Force a reload to measure original LCP again
            location.reload();
        } else {
            // Apply optimizations
            applyOptimizations();
            this.innerHTML = 'Reset to Original';
            isOptimized = true;
        }
    });

    function applyOptimizations() {
        // 1. Replace with optimized image
        const optimizedImage = new Image();
        optimizedImage.onload = function () {
            heroImage.src = this.src;
            // Add a preload hint to the head (for demonstration)
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = 'large-image.jpg';  // Optimized image URL
            document.head.appendChild(preloadLink);
        };
        optimizedImage.src = 'large-image.jpg'; // Optimized image URL

        // 2. Remove the lazy loading attribute which delays LCP
        heroImage.removeAttribute('loading');

        // 3. Prioritize the LCP element for the browser
        heroImage.setAttribute('fetchpriority', 'high');

        // Log what we've done
        console.log('✅ Optimizations applied:');
        console.log('1. Replaced large image with optimized version. png vs jpg');
        console.log('2. Removed lazy loading from LCP element');
        console.log('3. Added fetchpriority="high" to prioritize loading');
        console.log('4. Added preload hint for the image');
    }

    function showResults() {
        if (originalLCP > 0 && optimizedLCP > 0) {
            const improvement = originalLCP - optimizedLCP;
            const percentImprovement = ((improvement / originalLCP) * 100).toFixed(1);

            let performanceEmoji = '🟢';
            let performanceColor = '#4CAF50';
            if (percentImprovement < 5) {
                performanceEmoji = '🔴';
                performanceColor = '#F44336';
            } else if (percentImprovement < 10) {
                performanceEmoji = '🟡';
                performanceColor = '#FFC107';
            }

            resultsPanel.innerHTML = `
                <h4><i class="fas fa-chart-pie"></i> LCP Optimization Results</h4>
                <p><i class="fas fa-hourglass-start"></i> Original LCP: ${originalLCP.toFixed(2)} ms</p>
                <p><i class="fas fa-hourglass-end"></i> Optimized LCP: ${optimizedLCP.toFixed(2)} ms</p>
                <p><i class="fas fa-percentage"></i> Improvement: <span style="color:${performanceColor};font-weight:bold;">${improvement.toFixed(2)} ms (${percentImprovement}%) ${performanceEmoji}</span></p>
                <p><i class="fas fa-tools"></i> Techniques applied:</p>
                <ul>
                    <li><i class="fas fa-compress-arrows-alt"></i> Replaced large image with optimized version</li>
                    <li><i class="fas fa-eye"></i> Removed lazy loading from LCP element</li>
                    <li><i class="fas fa-sort-amount-up"></i> Added fetchpriority="high" to LCP element</li>
                    <li><i class="fas fa-fast-forward"></i> Added preload hint for the image</li>
                </ul>
            `;
            resultsPanel.style.display = 'block';
        }
    }

    // Additional educational features with colored console logs
    console.log('%c📊 Welcome to the LCP Performance Lab!', 'font-size: 16px; font-weight: bold; color: #4CAF50;');
    console.log('%c🔍 Open the Performance tab in DevTools and make a recording to see LCP in action.', 'color: #2196F3;');
    console.log('%c💡 Tip: Look for the LCP marker in the timings section of the performance recording.', 'color: #FF9800;');
    console.log('%c📈 A good LCP score is under 2.5 seconds.', 'color: #4CAF50;');
});