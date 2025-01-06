window.addEventListener("load", function () {
    let counter = 0;
    let speed = 1;
    let intervalId;
    const counterElement = document.getElementById('counter');
    const resetButton = document.getElementById('resetButton');
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');

    function updateCounter() {
        counter += 1;
        counterElement.textContent = counter;
    }

    function startCounter() {
        clearInterval(intervalId);
        intervalId = setInterval(updateCounter, 1000 / speed);
    }

    resetButton.addEventListener('click', () => {
        counter = 0;
        counterElement.textContent = counter;
    });

    speedSlider.addEventListener('input', (event) => {
        speed = parseInt(event.target.value, 10);
        speedValue.textContent = speed;
        startCounter();
    });

    startCounter();
});