window.addEventListener("load", function () {

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

    //////////////////////////////////////////

    // Memory Leak Example
    let leakArray = [];
    document.getElementById('leakButton').addEventListener('click', () => {
        for (let i = 0; i < 10000; i++) {
            leakArray.push(new Array(10000).fill('leak'));
        }
        console.log('Created memory leak objects');
    });

    // DOM Manipulation Test
    document.getElementById('domButton').addEventListener('click', () => {
        const container = document.getElementById('container');
        container.innerHTML = ''; // Clear previous elements
        for (let i = 0; i < 1000; i++) {
            const div = document.createElement('div');
            div.textContent = `Element ${i}`;
            container.appendChild(div);
        }
    });

    // Event Listeners Test
    let listenerCount = 0;
    document.getElementById('listenerButton').addEventListener('click', () => {
        const container = document.getElementById('listener-container');
        for (let i = 0; i < 100; i++) {
            const element = document.createElement('div');
            element.textContent = `Listener ${listenerCount++}`;
            element.addEventListener('click', () => console.log('clicked'));
            element.addEventListener('mouseover', () => console.log('hover'));
            element.addEventListener('mouseout', () => console.log('out'));
            container.appendChild(element);
        }
    });

});