function fetchData() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => console.log(data));
}

function performComputation() {
    const iterations1 = 1e7;
    const iterations2 = 2e7;
    const iterations3 = 3e7;
    const result = calculateSum(iterations1);
    const result2 = calculateSum(iterations2);
    const result3 = calculateSum(iterations3);

    displayResult(result + result2 + result3);
}

function calculateSum(limit) {
    let result = 0;
    for (let i = 0; i < limit; i++) {
        result = addToResult(result, calculateSqrtWrapper(i));
    }
    return result;
}

function addToResult(current, value) {
    return current + value;
}

function calculateSqrtWrapper(number) {
    const squared = squareNumber(number);
    return calculateSqrt(squared);
}

function squareNumber(number) {
    return number * number;
}

function calculateSqrt(number) {
    return Math.sqrt(number);
}

function displayResult(value) {
    document.getElementById('output').innerText = 'Computation Result: ' + value;
}

function trackMouse() {
    const logMousePosition = (event) => {
        console.log(`Mouse Position: (${event.clientX}, ${event.clientY})`);
    };

    document.addEventListener('mousemove', logMousePosition);
}