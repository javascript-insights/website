// Heavy calculation function that will show up clearly in performance profiles
function runHeavyCalculation() {
    console.log("Starting heavy calculation...");

    // Create a function that will show up in the call tree
    function fibonacci(n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    // This recursive function will create a distinctive pattern in the profiles
    const result = fibonacci(35);

    // DOM manipulation to show completion
    const container = document.querySelector('.container');
    const resultElement = document.createElement('div');
    resultElement.textContent = `Calculation result: ${result}`;
    resultElement.classList.add('result');

    // Clean up old results
    const oldResult = container.querySelector('.result');
    if (oldResult) container.removeChild(oldResult);

    container.appendChild(resultElement);
}

function fetchData() {
    console.log("Fetching data...");

    // Create a promise chain to demonstrate async operations in the performance panel
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            console.log("Response received");
            return response.json();
        })
        .then(data => {
            console.log(`Loaded ${data.length} items`);
            // Force layout by reading and writing DOM properties
            const height = document.body.offsetHeight;
            document.body.style.borderTop = '1px solid #ccc';
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function startAnimation() {
    const animation = document.getElementById('animation1');
    // Toggle animation state
    if (animation.style.animationPlayState === 'running') {
        animation.style.animationPlayState = 'paused';
    } else {
        animation.style.animationPlayState = 'running';

        // Force layout recalculations to demonstrate rendering costs
        setTimeout(() => {
            for (let i = 0; i < 50; i++) {
                // Force layout calculations
                const width = animation.offsetWidth;
                animation.style.margin = (i % 5) + 'px';
            }
        }, 500);
    }
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