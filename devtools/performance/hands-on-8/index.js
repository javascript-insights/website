window.addEventListener("load", function () {

    document.getElementById('startWorkers').addEventListener('click', () => {
        const worker1 = new Worker('worker.js');
        const worker2 = new Worker('worker.js');
        const worker3 = new Worker('worker.js');

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

        worker1.onmessage = worker2.onmessage = worker3.onmessage = (event) => {
            if (event.data === 'done') {
                checkCompletion();
            }
        };
    });
});