
function simulateFrames(s) {
    const ball = document.getElementById('ball');
    ball.style.animation = `bounce ${s} ease-in-out infinite`;

    const badball = document.getElementById('badball');
    badball.style.animation = `badbounce ${s} ease-in-out infinite`;
}

function simulateDroppedFrames() {
    // Block the main thread for ~2 seconds straight
    // This guarantees fully dropped frames (not just partial)
    const end = Date.now() + 2000;
    while (Date.now() < end) {
        const div = document.createElement('div');
        div.innerHTML = 'test';
        document.body.appendChild(div);
        void div.offsetHeight; // force layout
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
    // Continuously block the main thread across many frame deadlines
    // This creates sustained dropped frames visible in DevTools
    const container = document.createElement('div');
    document.body.appendChild(container);

    let frame = 0;
    function heavyFrame() {
        // Block for ~200ms per rAF callback — guarantees dropped frames
        const end = Date.now() + 200;
        while (Date.now() < end) {
            const div = document.createElement('div');
            div.textContent = `Item ${Math.random()}`;
            div.style.backgroundColor = Math.random() > 0.5 ? 'red' : 'blue';
            div.style.width = Math.random() * 100 + 'px';
            container.appendChild(div);
            void div.offsetHeight; // force synchronous layout
            void div.offsetWidth;
        }

        frame++;
        if (frame < 30) {
            requestAnimationFrame(heavyFrame);
        } else {
            container.remove();
        }
    }
    requestAnimationFrame(heavyFrame);
}