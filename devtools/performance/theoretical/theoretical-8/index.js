window.addEventListener("load", function () {
    document.getElementById('startWorker').addEventListener('click', () => {
        const worker = new Worker('worker.js');
        worker.postMessage('start');
        worker.onmessage = (event) => {
            if (event.data === 'done') {
                console.log('Worker Task Completed');
            }
        };
    });
});