// Global variables to store references
let objects = [];
let partyIntervals = [];
let loopObjects = { a: {}, b: {} };
let treeNodes = [];

// Exercise 1: Memory Monster
document.getElementById('createObjects').addEventListener('click', () => {
    for (let i = 0; i < 1000; i++) {
        objects.push({
            id: Math.random(),
            data: new Array(1000).fill('🧟‍♂️'),
            timestamp: new Date()
        });
    }
});

document.getElementById('clearObjects').addEventListener('click', () => {
    objects = [];
});

// Exercise 2: The Leaky Party
document.getElementById('startParty').addEventListener('click', () => {
    const danceFloor = document.getElementById('danceFloor');
    const dancer = document.createElement('div');
    dancer.textContent = '💃';
    dancer.style.position = 'relative';
    danceFloor.appendChild(dancer);

    // Create a new interval for each dancer that's never cleared
    const interval = setInterval(() => {
        dancer.style.left = Math.random() * 100 + 'px';
        dancer.style.top = Math.random() * 100 + 'px';
    }, 1000);

    partyIntervals.push(interval);
});

// Exercise 3: The Infinity Loop
document.getElementById('createLoop').addEventListener('click', () => {
    loopObjects.a.ref = loopObjects.b;
    loopObjects.b.ref = loopObjects.a;
});

document.getElementById('breakLoop').addEventListener('click', () => {
    loopObjects = { a: {}, b: {} };
});

// Exercise 4: DOM Family Tree
document.getElementById('growTree').addEventListener('click', () => {
    const tree = document.getElementById('familyTree');
    function createNode(depth) {
        if (depth > 5) return null;
        
        const node = document.createElement('div');
        node.className = 'tree-node';
        node.textContent = '🌳';
        
        for (let i = 0; i < 3; i++) {
            const child = createNode(depth + 1);
            if (child) {
                node.appendChild(child);
                treeNodes.push(child);
            }
        }
        return node;
    }

    const root = createNode(0);
    if (root) {
        tree.appendChild(root);
        treeNodes.push(root);
    }
});

document.getElementById('pruneTree').addEventListener('click', () => {
    const tree = document.getElementById('familyTree');
    tree.innerHTML = '';
    treeNodes = [];
});

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Memory exercises loaded and ready!');
});