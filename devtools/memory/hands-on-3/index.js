document.addEventListener('DOMContentLoaded', () => {
    let leaks = [];
    let detachedElements = [];
    let duplicatedStrings = [];

    document.getElementById('leakButton').addEventListener('click', () => {
        // Simulate a memory leak by creating a large array and not releasing it
        for (let i = 0; i < 10000; i++) {
            leaks.push(new Array(10000).fill('❌leak❌'));
        }
        console.log('Memory leak created');
    });

    document.getElementById('clearButton').addEventListener('click', () => {
        // Clear the memory leak
        leaks = [];
        console.log('Memory cleared');
    });

    document.getElementById('detachButton').addEventListener('click', () => {
        // Create detached elements
        for (let i = 0; i < 100; i++) {
            let elem = document.createElement('div');
            elem.textContent = '❌Detached Element ' + i;
            detachedElements.push(elem);
        }
        console.log('Detached elements created');
    });

    document.getElementById('duplicateStringsButton').addEventListener('click', () => {
        // Create duplicated strings
        for (let i = 0; i < 10000; i++) {
            duplicatedStrings.push('❌' + 'duplicated string '.repeat(1000) + '❌');
        }
        console.log('Duplicated strings');
    });

    document.getElementById('retainConsoleButton').addEventListener('click', () => {
        // Create objects that will be retained in console
        for (let i = 0; i < 100; i++) {
            let obj = {
                ['❌id❌']: i,
                ['❌data❌']: new Array(1000).fill('❌retained data❌'),
                ['❌timestamp❌']: new Date()
            };
            console.log(obj); // Objects logged to console are retained in memory
        }
        console.log('Objects retained in console');
    });
});
