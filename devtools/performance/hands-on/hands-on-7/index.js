// CPU-intensive task that will create a tall stack in the flame chart
function performTask() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.textContent = "Running CPU-intensive task...";

    // This will show up as a significant chunk in the flame chart
    let sum = 0;
    for (let i = 0; i < 1e7; i++) {
        sum += i;
    }

    resultsDiv.textContent = "CPU task completed! Sum: " + sum;
    console.log('CPU task completed!');
}

// DOM manipulation that will trigger layout and paint operations
function manipulateDOM() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.textContent = "Performing DOM operations...";

    // Create many elements to force layout recalculations
    for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        div.className = 'temp-element';
        div.textContent = 'Element ' + i;
        div.style.backgroundColor = i % 2 === 0 ? '#f0f0f0' : '#e0e0e0';
        div.style.padding = '5px';
        div.style.margin = '2px';
        resultsDiv.appendChild(div);

        // Force layout recalculation
        const height = div.offsetHeight;
    }

    // Cleanup after 1 second
    setTimeout(() => {
        const elements = document.querySelectorAll('.temp-element');
        elements.forEach(el => el.remove());
        resultsDiv.textContent = "DOM operations completed!";
    }, 1000);

    console.log('DOM operations executed!');
}

// Animation function - will show as repetitive patterns in the flame chart
function startAnimate() {
    const element = document.getElementById('animation');
    const resultsDiv = document.getElementById('results');
    resultsDiv.textContent = "Running animation...";

    element.style.display = 'block';
    let position = 0;

    const interval = setInterval(() => {
        if (position >= 300) {
            clearInterval(interval);
            resultsDiv.textContent = "Animation completed!";
            // Reset animation
            setTimeout(() => {
                element.style.transform = 'translateX(0)';
            }, 500);
        } else {
            position += 2;
            // This will show up as recurring frames in the flame chart
            element.style.transform = `translateX(${position}px)`;
        }
    }, 10);
}

// Run all tasks in sequence
function runAll() {
    performTask();
    setTimeout(() => {
        manipulateDOM();
        setTimeout(() => {
            startAnimate();
        }, 1500);
    }, 500);
}

// Initialize the page
window.addEventListener('DOMContentLoaded', () => {
    const animation = document.getElementById('animation');
    animation.style.display = 'none';
});

