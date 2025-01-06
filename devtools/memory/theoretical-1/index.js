window.addEventListener("load", function foo() {

  let leaks = [];
  let detachedElements = [];
  let duplicatedStrings = [];

  document.getElementById('leakButton').addEventListener('click', () => {
    // Simulate a memory leak by creating a large array and not releasing it
    for (let i = 0; i < 10000; i++) {
      leaks.push(new Array(10000).fill('leak'));
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
      elem.textContent = 'Detached Element ' + i;
      detachedElements.push(elem);
    }
    console.log('Detached elements created');
  });

  document.getElementById('duplicateStringsButton').addEventListener('click', () => {
    // Create duplicated strings
    for (let i = 0; i < 10000; i++) {
      duplicatedStrings.push('duplicated string');
    }
    console.log('Duplicated strings created');
  });
});
