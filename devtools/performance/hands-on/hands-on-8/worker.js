self.onmessage = (event) => {
    if (event.data === 'start') {
        // Perform a computationally intensive task
        for (let i = 0; i < 1000000000; i++) {
            Math.sqrt(i);
        }
        // Send a message back to the main thread indicating the task is done
        self.postMessage('done');
    }
};