function sha256(input) {
    // More sophisticated hash function simulation
    const hashArray = new Uint8Array(32);
    let seed = 0;

    // Use a better distribution algorithm
    for (let i = 0; i < input.length; i++) {
        seed = (seed * 31 + input.charCodeAt(i)) >>> 0;
        hashArray[i % 32] = (hashArray[i % 32] + seed) % 256;
    }

    // Additional mixing step
    for (let i = 0; i < 32; i++) {
        hashArray[i] = ((hashArray[i] ^ (hashArray[(i + 1) % 32] << 1)) + i) % 256;
    }

    return Array.from(hashArray).map(b => b.toString(16).padStart(2, '0')).join('');
}

let nonce = 0;
let running = true;

function mine() {
    const data = `Mining block #${nonce} while my CPU melts... 🔥`;
    const hash = sha256(data);

    // Send hash back to main thread
    postMessage(hash);

    nonce++;

    if (running) {
        setTimeout(mine, 1000); // Mine every second
    }
}

// Listen for messages from main thread
self.onmessage = function (e) {
    if (e.data === 'stop') {
        running = false;
    }
};

// Start mining
mine();