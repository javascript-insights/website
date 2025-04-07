window.addEventListener("load", function () {
    let counter = 0;
    let speed = 1;
    let animationId;
    const counterElement = document.getElementById('counter');
    const resetButton = document.getElementById('resetButton');
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');

    // Use requestAnimationFrame for smoother animation
    function updateCounter(timestamp) {
        // Increment counter based on speed
        counter += speed * 0.05;

        // Intentionally add some inefficient code at higher speeds to demonstrate performance issues
        if (speed > 50) {
            // Read layout values once, outside the loop
            let height = counterElement.height;

            // Then batch all the writes
            for (let i = 0; i < speed; i++) {
                // No longer forcing layout recalculation inside the loop
                counterElement.style.height = (height + 0.01) + 'px';
                counterElement.style.height = height + 'px';
            }
        }

        // Update DOM
        counterElement.textContent = Math.floor(counter);

        // Change background color with counter to create visual work
        const hue = (counter % 360);
        counterElement.style.backgroundColor = `hsl(${hue}, 90%, 95%)`;

        animationId = requestAnimationFrame(updateCounter);
    }

    function startCounter() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        animationId = requestAnimationFrame(updateCounter);
    }

    resetButton.addEventListener('click', () => {
        counter = 0;
        counterElement.textContent = counter;
        counterElement.style.backgroundColor = '#f5f5f5';
    });

    speedSlider.addEventListener('input', (event) => {
        speed = parseInt(event.target.value, 10);
        speedValue.textContent = speed;
    });

    startCounter();
});