window.addEventListener("load", function () {
    document.getElementById('testButton1').addEventListener('click', () => {
        const result1 = document.getElementById('result1');
        result1.textContent = 'Processing...';
        setTimeout(() => {
            result1.textContent = 'Interaction Complete!';
        }, 3000); // Simulated delay
    });

    document.getElementById('testButton2').addEventListener('click', () => {
        const result2 = document.getElementById('result2');
        result2.textContent = 'Processing...';
        setTimeout(() => {
            result2.textContent = 'Interaction Complete!';
        }, 1000); // Simulated delay
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