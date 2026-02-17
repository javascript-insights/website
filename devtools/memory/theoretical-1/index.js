window.A_GLOBAL_OBJECT = 'This is a silly global variable for absolutely no reason whatsoever!';

window.addEventListener("load", function foo() {

  ///////////////////////////////
  // Memory Leak Simulation - "🚰 Create Memory Leak (Oops!)"
  let leaks = [];

  document.getElementById('leakButton').addEventListener('click', () => {
    // Simulate a memory leak by creating a large array and not releasing it
    for (let i = 0; i < 1000; i++) {
      leaks.push(new Array(1000).fill('leak')); // This will create a large array in memory
    }
    console.log('Memory leak created');
    window.A_GLOBAL_OBJECT_2 = 'This is a silly global variable for absolutely no reason whatsoever 2!';
  });

  ///////////////////////////////
  // Memory Leak Cleanup - "🧹 Clean Up This Mess!"
  document.getElementById('clearButton').addEventListener('click', () => {
    // Clear the memory leak
    leaks = [];
    console.log('Memory cleared');
  });

  ///////////////////////////////
  // Memory Growth Simulation - "🎈 Make Memory Go Brrrr!"
  let grow = [];

  document.getElementById('growButton').addEventListener('click', () => {
    // memory grow
    grow.push(new Array(1000000).join('x')); // This will create a large string in memory
    console.log('Memory growed');
  });

  ///////////////////////////////
  // Detached elements - "👻 Create Ghost Elements"
  let detachedElements = [];
  document.getElementById('detachButton').addEventListener('click', () => {
    // Create detached elements
    for (let i = 0; i < 100; i++) { // Create 100 detached elements
      let elem = document.createElement('div');
      elem.textContent = 'Detached Element ' + i;
      detachedElements.push(elem);
    }
    console.log('Detached elements created');
  });

  ///////////////////////////////
  // duplicated strings - "🐑 Clone String Army"
  let duplicatedStrings = [];
  document.getElementById('duplicateStringsButton').addEventListener('click', () => {
    // Create duplicated strings
    for (let i = 0; i < 10000; i++) {
      duplicatedStrings.push('This is very long duplicated stringgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg'); // This will create many identical strings in memory
    }
    console.log('Duplicated strings created');
  });

  // "🐏🐑 Clone String Army 2"
  let duplicatedStrings2 = [];
  document.getElementById('duplicateStringsButton2').addEventListener('click', () => {
    // Create String objects with identical content for better visibility in memory tools
    const repeatedString = 'This is a string that will be duplicated many times in memory';
    for (let i = 0; i < 1000; i++) {
      duplicatedStrings2.push(new Array(i).join('g')); // This will create a large string in memory
    }
    console.log('Created 10000 identical String objects');
  });

  ///////////////////////////////
  // Shallow Size - "📏 How Big?"
  let shallowSizeArray = [];
  document.getElementById('shallowSizeButton').addEventListener('click', function () {
    console.log('Shallow Size button clicked');
    // Logic to demonstrate Shallow Size in the memory tool
    for (let i = 0; i < 1000; i++) {
      shallowSizeArray.push({ index: i, data: new Array(1000).fill('data' + i) }); // This will create many objects in memory
    }
    console.log('Shallow Size array created:', shallowSizeArray);
  });

  ///////////////////////////////
  // Retained Size - "🏋️ Show True Weight"
  document.getElementById('retainedSizeButton').addEventListener('click', function () {
    console.log('Retained Size button clicked');
    // Logic to demonstrate Retained Size in the memory tool
    let retainedSizeObject = {};
    for (let i = 0; i < 1000; i++) {
      retainedSizeObject['key' + i] = new Array(1000).fill('data' + i); // This will create a large object in memory
    }
    console.log('Retained Size object created:', retainedSizeObject);
  });

  ///////////////////////////////
  // Distance - "🚀 Space Between Things"
  document.getElementById('distanceButton').addEventListener('click', function () {
    console.log('Distance button clicked');
    // Logic to demonstrate Distance in the memory tool
    let root = { child: null };
    let current = root;
    for (let i = 0; i < 1000; i++) {
      current.child = { child: null };  // Create a chain of objects
      current = current.child;
    }
    console.log('Distance chain created:', root);
  });

  ///////////////////////////////
  // Object Creation and Garbage Collection Simulation - "🎭 Create Objects & Thanos Snap Half"
  let objects = [];
  document.getElementById('createObjectsBtn').addEventListener('click', () => {
    // Create many objects
    for (let i = 0; i < 100000; i++) {
      objects.push(new Object({ xxx: null, yyy: '' + i, zzz: 'z' })); // This will create many objects in memory
    }
    console.log('Objects created:', objects.length);

    // Simulate garbage collection by deleting half of the objects
    // Note: In a real scenario, you cannot force garbage collection in JavaScript.
    this.setTimeout(() => {
      console.log('Simulating garbage collection...');
      objects = objects.slice(objects.length / 2); // Keep only half of the objects
      console.log('Objects after GC:', objects.length);
    }
      , 8000); // Delay to simulate time for garbage collection
  });

});
