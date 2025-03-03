function changeBackgroundColor() {
    const demoBox = document.querySelector('.demo-box');
    const colors = ['#ffeb3b', '#4caf50', '#2196f3', '#9c27b0'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    demoBox.style.backgroundColor = randomColor;
}

function addAnimation() {
    const demoBox = document.querySelector('.demo-box');
    demoBox.classList.toggle('color-changing');
}