window.addEventListener("load", function foo() {

    // Global variables to store references
    let objects = [];
    let partyIntervals = [];
    let loopObjects = { a: { ["❌_name_❌"]: '🤔 NewObjectA' }, b: { ["❌_name_❌"]: '🤔 NewObjectB' } };

    /////////////////////////////////////////////////////////////////

    // Exercise 1: Memory Monster
    document.getElementById('createObjects').addEventListener('click', () => {
        for (let i = 0; i < 1000; i++) {
            objects.push({
                ["❇️_id_❇️"]: Math.random(),
                ["⛔_data_⛔"]: new Array(1000).fill('🧟‍♂️'),
                ["⌚_timestamp_⌚"]: new Date()
            });
        }
    });

    document.getElementById('clearObjects').addEventListener('click', () => {
        objects = [];
    });

    /////////////////////////////////////////////////////////////////

    // Exercise 2: The Leaky Party
    document.getElementById('startParty').addEventListener('click', () => {
        const danceFloor = document.getElementById('danceFloor');

        const partyInterval = setInterval(() => {
            const dancer = document.createElement('div');
            const dancerIcon = Math.random() > 0.5 ? '🕺' : '💃';
            dancer.textContent = dancerIcon;
            dancer["❌_data_❌"] = new Array(1000).fill('❇️' + dancerIcon + '❇️');
            dancer.style.position = 'relative';
            danceFloor.appendChild(dancer);

            const moveInterval = setInterval(() => {
                dancer.style.left = Math.random() * 100 + 'px';
                dancer.style.top = Math.random() * 100 + 'px';
            }, 1000);

            partyIntervals.push(moveInterval);
        }, 1000);

        partyIntervals.push(partyInterval);
    });

    document.getElementById('stopParty').addEventListener('click', () => {
        partyIntervals.forEach(interval => clearInterval(interval));
        partyIntervals = [];
        document.getElementById('danceFloor').innerHTML = '';
    });

    /////////////////////////////////////////////////////////////////

    // Exercise 3: The Infinity Loop

    document.getElementById('createLoop').addEventListener('click', () => {
        loopObjects.a = { ["❌_name_❌"]: '🤪 CircularObjectA is going in circles! Weeeee!', ["❌_data_❌"]: new Array(1000).fill('❇️') };
        loopObjects.b = { ["❌_name_❌"]: '🤪 CircularObjectB is going in circles! Weeeee!', ["❌_data_❌"]: new Array(1000).fill('❇️') };
        loopObjects.a["❌_ref_❌"] = loopObjects.b;
        loopObjects.b["❌_ref_❌"] = loopObjects.a;
    });

    document.getElementById('breakLoop').addEventListener('click', () => {
        loopObjects = { a: { ["❌_name_❌"]: '🤔 NewObjectA' }, b: { ["❌_name_❌"]: '🤔 NewObjectB' } };
    });

    /////////////////////////////////////////////////////////////////

    // Exercise 4: Linked List

    let linkedList = null;
    let globalReference = null;

    document.getElementById('createList').addEventListener('click', () => {
        class Node {
            constructor(value) {
                this.value = value;
                this.next = null;
                this["❌_data_❌"] = new Array(1000).fill('🔗');
            }
        }

        // Create a linked list with 100 nodes
        let head = new Node(0);
        head["❌_head_❌"] = new Array(1000).fill('🤯');
        let current = head;
        for (let i = 1; i < 100; i++) {
            current.next = new Node(i);
            current = current.next;
            // Store middle node as global reference
            if (i === 50) {
                globalReference = current;
                globalReference["❌_globalReference_❌"] = new Array(1000).fill('🌍');
            }
        }
        linkedList = head;
        linkedList["❌_linkedList_❌"] = new Array(1000).fill('🔗');

        // Visualize the list
        const visualizer = document.getElementById('listVisualizer');
        visualizer["❌_visualizer_❌"] = new Array(1000).fill('🪟');
        visualizer.innerHTML = '';
        current = head;
        while (current) {
            const node = document.createElement('span');
            node.textContent = `🔗${current.value} `;
            visualizer.appendChild(node);
            current = current.next;
        }
    });

    document.getElementById('clearList').addEventListener('click', () => {
        linkedList = null;
        globalReference = null;
        document.getElementById('listVisualizer').innerHTML = '';
    });

    /////////////////////////////////////////////////////////////////

    // Exercise 5: DOM Family Tree
    document.getElementById('growTree').addEventListener('click', () => {
        const tree = document.getElementById('familyTree');
        function createNode(depth) {
            if (depth > 20) return null;

            const node = document.createElement('div');
            node.className = '📏tree-node-' + depth;
            node.textContent = '🌳';
            node["❌_data_❌"] = new Array(1000).fill('❇️🌳❇️');

            for (let i = 0; i < 1; i++) {
                const child = createNode(depth + 1);
                if (child) {
                    node.appendChild(child);
                }
            }
            return node;
        }

        const root = createNode(0);
        if (root) {
            tree.appendChild(root);
        }
    });

    document.getElementById('pruneTree').addEventListener('click', () => {
        const tree = document.getElementById('familyTree');
        tree.innerHTML = '';
        treeNodes = [];
    });

    document.addEventListener('DOMContentLoaded', () => {
        console.log('Memory exercises loaded and ready!');
    });
});
