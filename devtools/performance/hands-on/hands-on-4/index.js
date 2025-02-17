function cpuIntensiveTask() {
    let sum = 0;
    for (let i = 0; i < 1e7; i++) {
        sum += Math.sqrt(i);
    }
    document.getElementById('result').innerText = 'CPU Intensive Task Completed';
}

function simpleTask() {
    document.getElementById('result').innerText = 'Simple Task Completed';
}

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

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
    document.querySelector("#atgo").disabled = true;
    a();
    b();
    c();
    document.querySelector("#atgo").disabled = false;
}
