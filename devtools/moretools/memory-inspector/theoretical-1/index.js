function runDemo() {
    const n = 60;
    const b1 = new Uint8Array(n);
    const b2 = new Uint8Array(n + 10);

    const str = 'This is a string in the ArrayBuffer :)!'
    for (var i = 0; i < str.length; ++i) {
        b1[i] = str.charCodeAt(i);
        b2[i] = i + 33;
    }

    // Opening this buffer in the Memory Inspector
    // will open the same view as for opening one for
    // b1.
    const buffer = b1.buffer;

    for (var i = str.length; i < n; ++i) {
        b1[i] = i;
        b2[i] = n - i - 1;
    }
}
runDemo();