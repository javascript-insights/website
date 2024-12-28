window.addEventListener("load", function () {

    const ball = document.getElementById('ball');
    const speedControl = document.getElementById('speed');

    function updateAnimation() {
        const speed = parseFloat(speedControl.value);
        if (isNaN(speed) || speed <= 0) {
            ball.style.animation = 'none';
        } else {
            ball.style.animation = `bounce ${6 / speed}s infinite`;
        }
    }

    speedControl.addEventListener('input', updateAnimation);

    updateAnimation();
});