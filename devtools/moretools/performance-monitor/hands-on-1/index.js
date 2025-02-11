document.addEventListener('DOMContentLoaded', () => {

});

function simulateCPUUsage() {
    console.log("Simulating high CPU usage...");
    let start = Date.now();
    while (Date.now() - start < 1000) {
        // Busy-wait loop to simulate high CPU usage
    }
}

function simulateJSHeapSize() {
    console.log("Simulating large JS heap size...");
    let largeArray = [];
    for (let i = 0; i < 1000000; i++) {
        largeArray.push(new Array(1000).fill('memory'));
    }
}

function simulateDOMNodes() {
    console.log("Simulating many DOM nodes...");
    for (let i = 0; i < 1000; i++) {
        let div = document.createElement('div');
        div.textContent = 'Node ' + i;
        document.body.appendChild(div);
    }
}

function simulateJSEventListeners() {
    console.log("Simulating many JS event listeners...");
    for (let i = 0; i < 1000; i++) {
        document.body.addEventListener('click', () => { });
    }
}

function simulateDocuments() {
    console.log("Simulating multiple documents...");
    for (let i = 0; i < 10; i++) {
        let iframe = document.createElement('iframe');
        iframe.src = 'about:blank';
        document.body.appendChild(iframe);
    }
}

function simulateDocumentFrames() {
    console.log("Simulating multiple document frames...");
    for (let i = 0; i < 10; i++) {
        let iframe = document.createElement('iframe');
        iframe.src = 'about:blank';
        document.body.appendChild(iframe);
    }
}

function simulateLayoutsPerSec() {
    console.log("Simulating high layouts/sec...");
    for (let i = 0; i < 1000; i++) {
        let div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.top = (i % 100) + 'px';
        document.body.appendChild(div);
    }
}

function simulateStyleRecalcPerSec() {
    console.log("Simulating high style recalc/sec...");
    for (let i = 0; i < 1000; i++) {
        let div = document.createElement('div');
        div.style.color = 'rgb(' + (i % 255) + ', 0, 0)';
        document.body.appendChild(div);
    }
}