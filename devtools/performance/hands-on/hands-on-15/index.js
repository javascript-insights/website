// Functions demonstrating a clear call hierarchy for Call Tree analysis

// Level 3 functions - Leaf functions that do actual work
function computeHeavyTask() {
    // Simulate CPU-intensive work
    const start = performance.now();
    while (performance.now() - start < 100) {
        // Busy loop consuming CPU
        Math.random() * Math.random();
    }
}

function manipulateDOM() {
    // Simulate DOM changes
    const div = document.createElement('div');
    div.style.display = 'none';
    document.body.appendChild(div);

    // Force layout recalculation
    div.style.width = '100px';
    const width = div.offsetWidth;

    // Clean up
    document.body.removeChild(div);
}

function doDataProcessing() {
    // Process a moderate amount of data
    const data = Array(10000).fill(0).map((_, i) => i);
    const processed = data.filter(n => n % 2 === 0)
        .map(n => n * n)
        .reduce((sum, n) => sum + n, 0);
    return processed;
}

// Level 2 functions - Mid-level functions that call level 3 functions
function renderComponent() {
    computeHeavyTask();
    manipulateDOM();
    return "Component rendered";
}

function processBusinessLogic() {
    computeHeavyTask();
    const result = doDataProcessing();
    return result;
}

// Level 1 functions - Top-level functions that orchestrate the application
function updateUI() {
    console.log("Starting UI update...");
    const renderResult = renderComponent();
    console.log("UI update completed:", renderResult);
}

function handleUserAction() {
    console.log("Processing user action...");
    const logicResult = processBusinessLogic();
    console.log("Business logic processed with result:", logicResult);
}

// Main function - The entry point that will be called by the button
function runCallTreeDemo() {
    console.log("=== Starting Call Tree Demo ===");

    // Add a delay to make the sequence clearer in the performance profile
    setTimeout(() => {
        updateUI();

        // Add another delay between major operations
        setTimeout(() => {
            handleUserAction();
            console.log("=== Call Tree Demo Completed ===");
        }, 100);
    }, 100);
}

// Add event listener after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const demoButton = document.getElementById('run-demo-button');
    if (demoButton) {
        demoButton.addEventListener('click', runCallTreeDemo);
    }
});
