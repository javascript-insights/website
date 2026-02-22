// CPU Intensive task that calculates several mathematical operations
function cpuIntensiveTask() {
    const startTime = performance.now();

    let sum = 0;
    for (let i = 0; i < 1e7; i++) {
        sum += Math.sqrt(i);
    }

    const duration = (performance.now() - startTime).toFixed(2);
    document.getElementById('result').innerHTML = `
        <div class="result-item">
            <h3>CPU Intensive Task Completed</h3>
            <p>Execution time: ${duration}ms</p>
            <p>This task performed 10 million square root calculations on the main thread.</p>
            <p>In the Performance panel, you should see a long yellow bar representing JavaScript execution time.</p>
        </div>
    `;
}

// Simple task that only updates the DOM
function simpleTask() {
    const startTime = performance.now();

    document.getElementById('result').innerHTML = `
        <div class="result-item">
            <h3>Simple Task Completed</h3>
            <p>Execution time: ${(performance.now() - startTime).toFixed(2)}ms</p>
            <p>This task only updated the DOM with minimal calculations.</p>
            <p>Compare the flamechart for this task with the CPU intensive task.</p>
        </div>
    `;
}

// Function that intentionally blocks the thread
function wait(ms) {
    const start = Date.now();
    while (Date.now() < start + ms) {
        // Busy waiting - intentionally blocking the main thread
    }
}

// Sequential tasks demonstration
function a() {
    wait(500);
}

function b() {
    wait(500);
}

function c() {
    wait(500);
}

function go() {
    const button = document.querySelector("#atgo");
    button.disabled = true;

    const startTime = performance.now();
    a();
    b();
    c();
    const duration = (performance.now() - startTime).toFixed(2);

    document.getElementById('result').innerHTML = `
        <div class="result-item">
            <h3>Sequential Tasks Completed</h3>
            <p>Execution time: ${duration}ms</p>
            <p>This demo executed three functions in sequence, each blocking for 500ms.</p>
            <p>Look at the flamechart to see the call stack for functions a(), b(), and c().</p>
        </div>
    `;

    button.disabled = false;
}

// Recursive function demonstration with Fibonacci
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function runRecursive() {
    const startTime = performance.now();

    const result = fibonacci(35);

    const duration = (performance.now() - startTime).toFixed(2);
    document.getElementById('result').innerHTML = `
        <div class="result-item">
            <h3>Recursive Task Completed</h3>
            <p>Calculated Fibonacci(35) = ${result}</p>
            <p>Execution time: ${duration}ms</p>
            <p>This recursive algorithm creates a deep call stack. In the Performance panel, look for a tall flame chart.</p>
        </div>
    `;
}

// Animation test with simultaneous CPU load
function animationTest() {
    // Start the animation
    const element = document.getElementById('moving-element');
    element.style.display = 'block';

    let position = 0;
    const animationFrame = () => {
        position = (position + 1) % 360;
        element.style.transform = `translateX(${Math.sin(position * Math.PI / 180) * 150}px)`;

        // Run some calculations every 5 frames to simulate CPU load during animation
        if (position % 5 === 0) {
            for (let i = 0; i < 200000; i++) {
                Math.sqrt(i * position);
            }
        }

        animationId = requestAnimationFrame(animationFrame);
    };

    let animationId = requestAnimationFrame(animationFrame);

    document.getElementById('result').innerHTML = `
        <div class="result-item">
            <h3>Animation + CPU Load Test Running</h3>
            <p>Watch the moving element. Is it smooth or jerky?</p>
            <p>In the Performance panel, check the FPS meter at the top to see if frames are being dropped.</p>
            <p>This demonstrates how CPU-intensive JavaScript can impact visual performance.</p>
            <button onclick="stopAnimation(${animationId})">Stop Animation</button>
        </div>
    `;
}

function stopAnimation(id) {
    cancelAnimationFrame(id);
    document.getElementById('moving-element').style.display = 'none';
    document.getElementById('result').innerHTML += "<p>Animation stopped.</p>";
}

// Compare async vs sync operations
function asyncVsSync() {
    document.getElementById('result').innerHTML = `
        <div class="result-item">
            <h3>Async vs Sync Comparison</h3>
            <p>First running synchronous blocking operations...</p>
        </div>
    `;

    // Helper: do a chunk of CPU work (~300ms of busy computation)
    function cpuWork() {
        const start = Date.now();
        while (Date.now() - start < 300) {
            // busy work
        }
    }

    // First do it synchronously — three chunks back-to-back, blocking the thread
    setTimeout(() => {
        const syncStart = performance.now();
        cpuWork();
        cpuWork();
        cpuWork();
        const syncDuration = (performance.now() - syncStart).toFixed(2);

        document.getElementById('result').innerHTML += `
            <p>Sync operations completed in ${syncDuration}ms (one continuous block on the main thread).</p>
            <p>Now running the same work asynchronously...</p>
        `;

        // Then do the same work asynchronously — same CPU work, but yielding between chunks
        const asyncStart = performance.now();

        function runChunk(remaining) {
            if (remaining <= 0) {
                const asyncDuration = (performance.now() - asyncStart).toFixed(2);
                document.getElementById('result').innerHTML += `
                    <p>Async operations completed in ${asyncDuration}ms (three separate blocks with idle gaps).</p>
                    <p>Both versions did the same CPU work, but the async version yielded between chunks, keeping the main thread responsive.</p>
                `;
                return;
            }
            // Yield to the event loop before the next chunk
            setTimeout(() => {
                cpuWork();
                runChunk(remaining - 1);
            }, 0);
        }

        runChunk(3);
    }, 100);
}

// --- INP Demo ---
let inpClickCount = 0;

function heavyClick() {
    inpClickCount++;

    // Each click blocks the main thread longer than the last,
    // making INP progressively worse.
    const blockTime = 150 + inpClickCount * 100; // ms
    const start = Date.now();
    while (Date.now() - start < blockTime) {
        // Busy-wait — intentionally blocking the main thread
    }

    const counter = document.getElementById('inp-counter');
    if (counter) {
        counter.textContent = `Clicks: ${inpClickCount}  |  Last blocking time: ${blockTime} ms`;
    }
}

// --- CLS Demo ---
// Inject a block after the page loads to cause a visible layout shift
function triggerLayoutShift() {
    const area = document.getElementById('cls-inject-area');
    if (!area) return;
    const block = document.createElement('div');
    block.className = 'cls-injected-block';
    block.textContent = 'This block was injected after load — it pushed content down and caused a layout shift!';
    area.prepend(block);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    // Ensure the animation element is hidden initially
    const element = document.getElementById('moving-element');
    if (element) {
        element.style.display = 'none';
    }

    // Trigger a layout shift after a short delay so the browser
    // has already painted the initial layout (making the shift visible to CLS).
    setTimeout(triggerLayoutShift, 1500);
});
