self.onmessage = (event) => {
    if (event.data === 'start') {
        // Simulate CPU-intensive work
        const startTime = Date.now();
        while (Date.now() - startTime < 2000) {
            // Busy wait for 2 seconds
            Math.sqrt(Math.random() * 10000);
        }
        // Send result back to main thread
        self.postMessage('done');
    }
};