
function performTask() {
    let sum = 0;
    for (let i = 0; i < 1e7; i++) {
        sum += i;
    }
    console.log('Task completed!');
}

function startAnimate() {
    const element = document.getElementById('animation');
    let position = 0;
    const interval = setInterval(() => {
        if (position >= 300) {
            clearInterval(interval);
        } else {
            position++;
            element.style.transform = `translateX(${position}px)`;
        }
    }, 10);
}