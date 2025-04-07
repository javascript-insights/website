window.addEventListener("load", function () {
    const startButton = document.getElementById('startWorkers');
    const statusElement = document.getElementById('status');

    startButton.addEventListener('click', () => {
        statusElement.textContent = "Workers running...";
        statusElement.className = "running";
        startButton.disabled = true;

        // Create workers
        const workers = [];
        for (let i = 0; i < 4; i++) {
            const worker = new Worker('worker.js');
            workers.push(worker);

            worker.onmessage = (event) => {
                if (event.data === 'done') {
                    // Mark this worker as completed
                    worker.completed = true;

                    // Check if all workers are done
                    if (workers.every(w => w.completed)) {
                        statusElement.textContent = "All workers completed!";
                        statusElement.className = "completed";
                        startButton.disabled = false;
                        console.log('All workers completed');
                    }
                }
            };
        }

        // Start all workers
        console.log('Starting workers...');
        performance.mark('workers-start');
        workers.forEach(worker => worker.postMessage('start'));
    });
});