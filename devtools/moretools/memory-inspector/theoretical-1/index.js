document.addEventListener('DOMContentLoaded', () => {

});

function allocateArrayBuffer() {
    var arrayBuffer = new ArrayBuffer(1024 * 1024); // 1MB
    console.log('ArrayBuffer allocated');
}

function allocateTypedArray() {
    var typedArray = new Uint8Array(1024 * 1024); // 1MB
    console.log('TypedArray allocated');
}

function allocateObject() {
    var obj = {};
    for (let i = 0; i < 100000; i++) {
        obj[i] = { index: i, value: Math.random() };
    }
    console.log('Object allocated');
}

function allocateString() {
    var str = new Array(1000000).join('a'); // 1 million characters
    console.log('String allocated');
}

function allocateMap() {
    var map = new Map();
    for (let i = 0; i < 100000; i++) {
        map.set(i, { index: i, value: Math.random() });
    }
    console.log('Map allocated');
}

function allocateSet() {
    var set = new Set();
    for (let i = 0; i < 100000; i++) {
        set.add({ index: i, value: Math.random() });
    }
    console.log('Set allocated');
}

function allocateWeakMap() {
    var weakMap = new WeakMap();
    for (let i = 0; i < 100000; i++) {
        let obj = { index: i, value: Math.random() };
        weakMap.set(obj, obj);
    }
    console.log('WeakMap allocated');
}

function allocateWeakSet() {
    var weakSet = new WeakSet();
    for (let i = 0; i < 100000; i++) {
        let obj = { index: i, value: Math.random() };
        weakSet.add(obj);
    }
    console.log('WeakSet allocated');
}