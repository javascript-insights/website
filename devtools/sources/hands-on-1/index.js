function changeBackgroundColor1() {
    const demoBox = document.querySelector('.demo-box-1');
    const colors = ['red', 'blue', 'green', 'yellow'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    demoBox.style.backgroundColor = randomColor;
}

function changeBackgroundColor2() {
    const demoBox = document.querySelector('.demo-box-2');
    const colors = ['red', 'blue', 'green', 'yellow'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    demoBox.style.backgroundColor = randomColor;
}