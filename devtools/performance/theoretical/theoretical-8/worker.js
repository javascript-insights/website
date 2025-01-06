self.onmessage = (event) => {
    if (event.data === 'start') {
        for (let i = 0; i < 1000000000; i++) {
            Math.sqrt(i);
        }
        self.postMessage('done');
    }
};