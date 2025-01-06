document.addEventListener("DOMContentLoaded", function () {

    const leaks = [];
    document.getElementById('leakButton').addEventListener('click', () => {
        for (let i = 0; i < 1000; i++) {
            leaks.push(new Array(1000).fill('leak'));
        }
    });

    document.getElementById('domButton').addEventListener('click', () => {
        const container = document.getElementById('container');
        for (let i = 0; i < 1000; i++) {
            const div = document.createElement('div');
            div.textContent = `Item ${i}`;
            container.appendChild(div);
        }
    });

   
});