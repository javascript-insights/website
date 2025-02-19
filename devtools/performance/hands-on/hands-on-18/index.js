document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('performTask');
    const result = document.getElementById('result');

    // Intentionally problematic code
    button.addEventListener('click', () => {
        // Long task - expensive calculation
        let sum = 0;
        for(let i = 0; i < 1000000; i++) {
            sum += Math.sqrt(i);
            if(i % 1000 === 0) {
                // Forced reflow
                result.style.height = (result.offsetHeight + 1) + 'px';
            }
        }

        // Heavy DOM manipulation
        result.innerHTML = '';
        for(let i = 0; i < 1000; i++) {
            const div = document.createElement('div');
            div.textContent = `Item ${i}`;
            // Forcing layout recalculation
            div.style.width = result.offsetWidth + 'px';
            result.appendChild(div);
        }
    });
});
