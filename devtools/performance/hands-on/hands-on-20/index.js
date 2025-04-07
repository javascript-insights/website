// Regular recursive function that causes stack overflow
function loop(x) {
    if (x >= 1000000000) return;
    loop(x + 1);
}

// Modified version using setTimeout to avoid stack overflow
function delayedLoop(x) {
    if (x >= 100) return; // Limit to 100 iterations for demo

    // Display counter to show progress
    const messageEl = document.getElementById('errorMessage');
    messageEl.textContent = `Iteration: ${x}`;
    messageEl.style.color = 'green';

    // Using setTimeout creates a new call stack for each iteration
    setTimeout(() => delayedLoop(x + 1), 50);
}

// CPU intensive task for profiling
function runCPUIntensiveTask() {
    const messageEl = document.getElementById('errorMessage');
    messageEl.textContent = 'Running CPU intensive task...';
    messageEl.style.color = 'blue';

    // Force layout calculations that will show up in performance recordings
    setTimeout(() => {
        // Create a large array
        const data = new Array(500000).fill(0);

        // Do some expensive operations
        for (let i = 0; i < 1000; i++) {
            for (let j = 0; j < data.length; j++) {
                data[j] = Math.sqrt(j) * Math.sin(j);
            }
        }

        messageEl.textContent = 'CPU intensive task completed!';
    }, 100);
}

function showHint() {
    const hintText = document.getElementById('hintText');

    if (hintText.style.display === 'block') {
        hintText.style.display = 'none';
    } else {
        hintText.style.display = 'block';
    }
}

// Set up error handler to display error messages
window.addEventListener('error', function (e) {
    document.getElementById('errorMessage').textContent = e.message;
    document.getElementById('errorMessage').style.color = 'red';

    // Prevent default error handling
    e.preventDefault();
});