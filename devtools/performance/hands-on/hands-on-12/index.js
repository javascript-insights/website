document.addEventListener("DOMContentLoaded", function () {
    // Memory leak example
    const leaks = [];
    document.getElementById('leakButton').addEventListener('click', () => {
        for (let i = 0; i < 1000; i++) {
            leaks.push(new Array(1000).fill('leak'));
        }

        // Update memory usage counter
        const usageElem = document.getElementById('memoryUsage');
        const usageMB = (leaks.length * 1000 * 4) / (1024 * 1024);
        usageElem.textContent = usageMB.toFixed(2) + " MB";
    });

    document.getElementById('clearLeaks').addEventListener('click', () => {
        // This doesn't actually clear the memory in the problematic example
        // It just empties the array but references remain
        while (leaks.length > 0) {
            leaks.pop();
        }

        document.getElementById('memoryUsage').textContent = "0.00 MB";
    });

    // DOM manipulation example
    document.getElementById('domButton').addEventListener('click', () => {
        console.time('DOM manipulation');
        const container = document.getElementById('container');

        // Clear previous content
        container.innerHTML = '';

        // Inefficient way - causes layout thrashing
        for (let i = 0; i < 500; i++) {
            const div = document.createElement('div');
            div.textContent = `Item ${i}`;
            div.style.padding = '5px';
            div.style.borderBottom = '1px solid #eee';
            container.appendChild(div);
        }
        console.timeEnd('DOM manipulation');
    });

    document.getElementById('optimizedDomButton').addEventListener('click', () => {
        console.time('Optimized DOM manipulation');
        const container = document.getElementById('container');

        // Clear previous content
        container.innerHTML = '';

        // Efficient way - using document fragment
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 500; i++) {
            const div = document.createElement('div');
            div.textContent = `Item ${i}`;
            div.style.padding = '5px';
            div.style.borderBottom = '1px solid #eee';
            fragment.appendChild(div);
        }
        container.appendChild(fragment);
        console.timeEnd('Optimized DOM manipulation');
    });

    // Toggle solution visibility
    document.querySelectorAll('.show-solution').forEach(button => {
        button.addEventListener('click', function () {
            const solutionId = this.getAttribute('data-solution');
            const solution = document.getElementById(solutionId);
            if (solution.style.display === 'none' || solution.style.display === '') {
                solution.style.display = 'block';
                this.textContent = 'Hide Solution';
            } else {
                solution.style.display = 'none';
                this.textContent = 'Show Solution';
            }
        });
    });
});