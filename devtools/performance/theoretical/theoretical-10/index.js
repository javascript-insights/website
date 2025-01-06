function fetchData() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => console.log(data));
}

function performComputation() {
    let result = 0;
    for (let i = 0; i < 1e7; i++) {
        result += Math.sqrt(i);
    }
    document.getElementById('output').innerText = 'Computation Result: ' + result;
}

function trackMouse() {
    document.addEventListener('mousemove', (event) => {
        console.log(`Mouse Position: (${event.clientX}, ${event.clientY})`);
    });
}