window.addEventListener("load", function () {
    const ball = document.getElementById('ball');
    const speedControl = document.getElementById('speed');
    const fpsCounter = document.getElementById('fps-counter');
    const stressButton = document.getElementById('stress-test');
    const heavyAnimationCheckbox = document.getElementById('heavy-animation');
    const heavyElement = document.querySelector('.heavy-element');

    let lastFrameTime = performance.now();
    let frameCount = 0;
    let isStressing = false;

    function updateAnimation() {
        const speed = parseFloat(speedControl.value);
        ball.style.animation = `bounce ${6 / speed}s infinite`;
    }



    function createHeavyLoad() {
        if (!isStressing) return;

        // Create heavy calculations
        let result = 0;
        for (let i = 0; i < 500000; i++) {
            result += Math.sqrt(i) * Math.tan(i);
        }

        setTimeout(createHeavyLoad, 100);
    }

    stressButton.addEventListener('click', function () {
        isStressing = !isStressing;
        this.textContent = isStressing ? 'Stop Stress Test' : 'Start Stress Test';

        if (isStressing) {
            createHeavyLoad();
        }
    });

    heavyAnimationCheckbox.addEventListener('change', function () {
        if (this.checked) {
            // More complex gradient with multiple color stops
            heavyElement.style.background = 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 25%, rgba(70,252,167,1) 50%, rgba(252,186,70,1) 75%, rgba(63,94,251,1) 100%)';
            heavyElement.style.animation = 'background-shift 1s linear infinite';

            // Add multiple box-shadows for higher GPU load
            heavyElement.style.boxShadow = '0 0 10px rgba(255,0,0,0.7), 0 0 20px rgba(0,255,0,0.7), 0 0 30px rgba(0,0,255,0.7), 0 0 40px rgba(255,255,0,0.7), 0 0 50px rgba(255,0,255,0.7)';

            // Add filter effects which are GPU intensive
            heavyElement.style.filter = 'blur(2px) contrast(150%) brightness(120%) saturate(200%)';

            // Force layout recalculations with transform
            heavyElement.style.transform = 'perspective(500px) rotateY(10deg)';
        } else {
            heavyElement.style.background = 'none';
            heavyElement.style.animation = 'none';
            heavyElement.style.boxShadow = 'none';
            heavyElement.style.filter = 'none';
            heavyElement.style.transform = 'none';
        }
    });

    speedControl.addEventListener('input', updateAnimation);

    function updateFPS() {
        const now = performance.now();
        const elapsed = now - lastFrameTime;

        if (elapsed >= 1000) {
            const fps = Math.round((frameCount * 1000) / elapsed);
            fpsCounter.textContent = `FPS: ${fps}`;

            // Color-code FPS counter
            if (fps >= 50) {
                fpsCounter.style.backgroundColor = 'rgba(0, 128, 0, 0.7)'; // Green
            } else if (fps >= 30) {
                fpsCounter.style.backgroundColor = 'rgba(255, 165, 0, 0.7)'; // Orange
            } else {
                fpsCounter.style.backgroundColor = 'rgba(255, 0, 0, 0.7)'; // Red
            }

            frameCount = 0;
            lastFrameTime = now;
        }

        frameCount++;
        requestAnimationFrame(updateFPS);
    }

    // Initialize
    updateAnimation();
    requestAnimationFrame(updateFPS);
});