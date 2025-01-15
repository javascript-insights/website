window.addEventListener("load", function foo() {

  let grow = [];
  let leaks = [];
  let detachedElements = [];
  let duplicatedStrings = [];
  let objects = [];


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

  document.getElementById('growButton').addEventListener('click', () => {
    // memory grow
    grow.push(new Array(1000000).join('x'));
    console.log('Memory growed');
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

  document.getElementById('shallowSizeButton').addEventListener('click', function () {
    console.log('Shallow Size button clicked');
    // Logic to demonstrate Shallow Size in the memory tool
    let shallowSizeArray = [];
    for (let i = 0; i < 1000; i++) {
      shallowSizeArray.push({ index: i });
    }
    console.log('Shallow Size array created:', shallowSizeArray);
  });

  document.getElementById('retainedSizeButton').addEventListener('click', function () {
    console.log('Retained Size button clicked');
    // Logic to demonstrate Retained Size in the memory tool
    let retainedSizeObject = {};
    for (let i = 0; i < 1000; i++) {
      retainedSizeObject['key' + i] = new Array(1000).fill('data');
    }
    console.log('Retained Size object created:', retainedSizeObject);
  });

  document.getElementById('distanceButton').addEventListener('click', function () {
    console.log('Distance button clicked');
    // Logic to demonstrate Distance in the memory tool
    let root = { child: null };
    let current = root;
    for (let i = 0; i < 1000; i++) {
      current.child = { child: null };
      current = current.child;
    }
    console.log('Distance chain created:', root);
  });

  document.getElementById('createObjectsBtn').addEventListener('click', () => {
    // Create many objects
    for (let i = 0; i < 100000; i++) {
      objects.push({ index: i });
    }
    console.log('Objects created:', objects.length);

    // Simulate garbage collection by deleting half of the objects
    objects = objects.slice(0, objects.length / 2);
    console.log('Objects after GC:', objects.length);
  });

});
