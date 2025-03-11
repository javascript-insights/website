document.addEventListener('DOMContentLoaded', () => {

});

var str, obj, typedArray, arrayBuffer, map, set, weakMap, weakSet;

function allocateArrayBuffer() {
    arrayBuffer = new ArrayBuffer(50 * 1024 * 1024); // 50MB
    console.log('ArrayBuffer allocated');
}

function allocateTypedArray() {
    typedArray = new Uint8Array(50 * 1024 * 1024); // 50MB
    console.log('TypedArray allocated');
}

function allocateObject() {
    obj = {};
    for (let i = 0; i < 1000000; i++) {
        obj[i] = { index: i, value: Math.random(), data: new Array(100).fill('x') };
    }
    console.log('Object allocated');
}

function allocateString() {
    str = new Array(10000000).join('a'); // 10 million characters
    console.log('String allocated');
}

function allocateMap() {
    map = new Map();
    for (let i = 0; i < 1000000; i++) {
        map.set(i, { index: i, value: Math.random(), data: new Array(500).fill(i) });
    }
    console.log('Map allocated');
}

function allocateSet() {
    set = new Set();
    for (let i = 0; i < 1000000; i++) {
        set.add({ index: i, value: Math.random(), data: new Array(500).fill(i) });
    }
    console.log('Set allocated');
}

function allocateWeakMap() {
    weakMap = new WeakMap();
    for (let i = 0; i < 1000000; i++) {
        let obj = { index: i, value: Math.random(), data: new Array(500).fill(i) };
        weakMap.set(obj, obj);
    }
    console.log('WeakMap allocated');
}

function allocateWeakSet() {
    weakSet = new WeakSet();
    for (let i = 0; i < 1000000; i++) {
        let obj = { index: i, value: Math.random(), data: new Array(500).fill(i) };
        weakSet.add(obj);
    }
    console.log('WeakSet allocated');
}