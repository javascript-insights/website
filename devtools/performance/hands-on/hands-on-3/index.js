window.addEventListener("load", function () {
    const result1 = document.getElementById('result1');
    const result2 = document.getElementById('result2');
    const responseTimeDisplay = document.getElementById('responseTime');

    // Heavy processing button - demonstrates poor INP
    document.getElementById('testButton1').addEventListener('click', () => {
        const startTime = performance.now();
        result1.textContent = 'Processing...';

        // Simulate a heavy computation that blocks the main thread
        const heavyComputation = () => {
            // This is deliberately inefficient to demonstrate INP issues
            let result = 0;
            for (let i = 0; i < 5000000; i++) {
                result += Math.sqrt(i) * Math.sin(i);
            }
            return result;
        };

        // Run the heavy computation synchronously, blocking the main thread
        const computationResult = heavyComputation();

        // Update the UI after computation
        setTimeout(() => {
            const endTime = performance.now();
            const duration = Math.round(endTime - startTime);

            result1.textContent = `Computation complete! Value: ${computationResult.toFixed(2)}`;
            responseTimeDisplay.textContent = `${duration}ms`;

            // Add color indication based on INP thresholds
            if (duration <= 200) {
                responseTimeDisplay.style.color = '#137333'; // Good
            } else if (duration <= 500) {
                responseTimeDisplay.style.color = '#ea8600'; // Needs improvement
            } else {
                responseTimeDisplay.style.color = '#c5221f'; // Poor
            }
        }, 0);
    });

    // Better performing button - demonstrates good INP
    document.getElementById('testButton2').addEventListener('click', () => {
        const startTime = performance.now();
        result2.textContent = 'Processing...';

        // Use setTimeout to move work off the main thread immediately
        setTimeout(() => {
            // Even though this does processing, it happens after the browser has had
            // a chance to update the UI, resulting in better INP
            let result = 0;
            for (let i = 0; i < 1000; i++) {
                result += i;
            }

            const endTime = performance.now();
            const duration = Math.round(endTime - startTime);

            // Use requestAnimationFrame for visual updates
            requestAnimationFrame(() => {
                result2.textContent = `Quick calculation complete! Value: ${result}`;
                responseTimeDisplay.textContent = `${duration}ms`;

                // Add color indication based on INP thresholds
                if (duration <= 200) {
                    responseTimeDisplay.style.color = '#137333'; // Good
                } else if (duration <= 500) {
                    responseTimeDisplay.style.color = '#ea8600'; // Needs improvement
                } else {
                    responseTimeDisplay.style.color = '#c5221f'; // Poor
                }
            });
        }, 0);
    });
});

/*
Instructions for participants:
1. Open the browser DevTools and navigate to the Performance tab.
2. Start profiling and reload the page.
3. Click the buttons and observe the performance metrics.
4. Analyze the performance data to identify bottlenecks.
5. Optimize the code to reduce the interaction delay.
6. Document your findings and optimizations.
*/