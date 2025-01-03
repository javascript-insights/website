function fetchData() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => console.log(data));
}

function startAnimation() {
    const animation = document.getElementById('animation1');
    animation.style.animationPlayState = 'running';
}

function triggerLoadingEvent() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => console.log(data));
}

function triggerScriptingEvent() {
    setTimeout(() => {
        console.log('Timer Fired');
    }, 1000);
}

function triggerRenderingEvent() {
    document.body.style.backgroundColor = document.body.style.backgroundColor === 'lightblue' ? 'white' : 'lightblue';
}

function triggerPaintingEvent() {
    const animation = document.getElementById('animation2');
    animation.style.animationPlayState = 'running';
    setTimeout(() => {
        animation.style.animationPlayState = 'paused';
    }, 2000);
}