
function simulateFrames(s) {
    const ball = document.getElementById('ball');
    ball.style.animation = `bounce ${s} ease-in-out infinite`;

    const badball = document.getElementById('badball');
    badball.style.animation = `badbounce ${s} ease-in-out infinite`;
}

function simulateDroppedFrames() {
    // Simulate heavy computation causing dropped frames
    for (let i = 0; i < 100000; i++) {
        const div = document.createElement('div');
        div.innerHTML = 'test';
        div.remove();
    }
}

function simulatePartialFrames() {
    // Create moderate load
    setInterval(() => {
        const now = Date.now();
        while (Date.now() - now < 100) {
            // Block for 100ms
        }
    }, 500);
}

// spinningSquare animation
document.addEventListener('DOMContentLoaded', () => {
    let rotation = 0;
    function spin() {
        rotation += 2;
        const square = document.getElementById('spinningSquare');
        square.style.transform = `rotate(${rotation}deg)`;
        requestAnimationFrame(spin);
    }
    requestAnimationFrame(spin);
});

function betterFrameDropSimulation() {
    // Add elements to the DOM to force reflows/repaints
    const container = document.createElement('div');
    document.body.appendChild(container);

    // Force layout recalculations in a loop
    for (let i = 0; i < 1000; i++) {
        const div = document.createElement('div');
        div.textContent = `Item ${i}`;
        div.style.backgroundColor = i % 2 === 0 ? 'red' : 'blue';
        container.appendChild(div);

        // Force layout calculation
        console.log(div.offsetHeight);

        // Change styles to force more work
        div.style.width = (50 + (i % 10)) + 'px';
        console.log(div.offsetWidth); // Force another layout
    }
}