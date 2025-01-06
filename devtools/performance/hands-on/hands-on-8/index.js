window.addEventListener("load", function () {
    // Add event listener to the button to start worker tasks
    document.getElementById('startWorkers').addEventListener('click', () => {
        // Create three web workers
        const worker1 = new Worker('worker.js');
        const worker2 = new Worker('worker.js');
        const worker3 = new Worker('worker.js');

        // Send 'start' message to each worker to begin their tasks
        worker1.postMessage('start');
        worker2.postMessage('start');
        worker3.postMessage('start');

        let completed = 0;
        const checkCompletion = () => {
            completed++;
            if (completed === 3) {
                console.log('All Worker Tasks Completed');
            }
        };

        // Listen for messages from the workers indicating task completion
        worker1.onmessage = worker2.onmessage = worker3.onmessage = (event) => {
            if (event.data === 'done') {
                checkCompletion();
            }
        };
    });
});