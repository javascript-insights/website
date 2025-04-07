document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('performTask');
    const result = document.getElementById('result');

    button.addEventListener('click', () => {
        performMainTask();

        // Oops! Developer forgot to remove this debugging function
        validatePerformance();
    });

    function performMainTask() {
        // Normal functionality - adding items to the result
        result.innerHTML = '';
        for (let i = 0; i < 1000; i++) {
            const div = document.createElement('div');
            div.textContent = `Item ${i}`;
            result.appendChild(div);
        }
    }

    function validatePerformance() {
        // Unnecessary performance killer left in by mistake
        console.log("Running performance validation...");

        // Expensive calculation with no real purpose in production
        let sum = 0;
        for (let i = 0; i < 1000000; i++) {
            sum += Math.sqrt(i);

            // Unnecessary forced reflow
            if (i % 10000 === 0) {
                result.style.height = (result.offsetHeight + 1) + 'px';
                console.log(`Performance check ${i / 10000}...`);
            }
        }

        console.log("Performance validation complete", sum);
    }
});
