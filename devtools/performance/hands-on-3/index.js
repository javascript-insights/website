window.addEventListener("load", function () {
    document.getElementById('testButton1').addEventListener('click', () => {
        const result1 = document.getElementById('result1');
        result1.textContent = 'Processing...';
        setTimeout(() => {
            result1.textContent = 'Interaction Complete!';
        }, 3000); // Simulated delay
    });

    document.getElementById('testButton2').addEventListener('click', () => {
        const result2 = document.getElementById('result2');
        result2.textContent = 'Processing...';
        setTimeout(() => {
            result2.textContent = 'Interaction Complete!';
        }, 1000); // Simulated delay
    });
});