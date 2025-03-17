function simulateNormalFrames() {
    const ball = document.getElementById('ball');
    ball.style.animation = 'bounce 1s ease-in-out infinite';
}

function simulateDroppedFrames() {
    const ball = document.getElementById('ball');
    ball.style.animation = 'bounce 1s ease-in-out infinite';
    // Simulate heavy computation causing dropped frames
    for (let i = 0; i < 1000000; i++) {
        const div = document.createElement('div');
        div.innerHTML = 'test';
        div.remove();
    }
}

function simulatePartialFrames() {
    const ball = document.getElementById('ball');
    ball.style.animation = 'bounce 0.5s ease-in-out infinite';
    // Create moderate load
    setInterval(() => {
        const now = Date.now();
        while (Date.now() - now < 20) {
            // Block for 20ms
        }
    }, 100);
}