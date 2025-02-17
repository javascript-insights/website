function calculateFactorial(num) {
    if (num === 0) return 1;
    return num * calculateFactorial(num - 1);
}

function generateFibonacciSequence(count) {
    const sequence = [0, 1];
    for (let i = 2; i < count; i++) {
        sequence[i] = sequence[i - 1] + sequence[i - 2];
    }
    return sequence;
}

function sortAndFilterArray() {
    const arr = new Array(10000).fill(0).map(() => Math.random() * 1000);
    return arr.sort((a, b) => a - b).filter(num => num > 500);
}

function performComplexOperations() {
    calculateFactorial(10);
    generateFibonacciSequence(1000);
    sortAndFilterArray();
}

// Run operations every 2 seconds
setInterval(performComplexOperations, 2000);
