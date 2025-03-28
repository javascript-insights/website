window.addEventListener("load", function foo() {

  function onClick() {
    if (inputsAreEmpty()) {
      label.textContent = "Error: one or both inputs are empty.";
      return;
    }

    updateLabel();
  }
  function inputsAreEmpty() {
    if (getNumber1() === "" || getNumber2() === "") {
      return true;
    } else {
      return false;
    }
  }
  function updateLabel() {
    var add1 = getNumber1();
    var add2 = getNumber2();
    var sum = add1 + add2;
    label.textContent = add1 + " + " + add2 + " = " + sum;
  }
  function getNumber1() {
    return inputs[0].value;
  }
  function getNumber2() {
    return inputs[1].value;
  }
  var inputs = document.querySelectorAll("input");
  var label = document.querySelector("p");
  var button = document.querySelector("button");
  button.addEventListener("click", onClick);
});

///////////////////////

function qux() {
  (function baz() {
    window.cs();
  })();
}

//////////////////////////////

function modifyDOM() {
  const element = document.getElementById('targetElement');
  element.textContent = 'DOM Modified!';
  element.style.backgroundColor = '#ffeb3b';
}

//////////////////////////////

// Right-click line number -> Add conditional breakpoint
// Example condition: i === 5 && user.name === "Alice"
var user = {
  name: "Alice",
  age: 25,
};
function processData(i) {
  console.log('Processing data:', i);
}
// This is a simple function that simulates data processing
function conditionalBreakpoint() {
  for (let i = 0; i < 10; i++) {
    console.log('Loop iteration:', i); // Add conditional breakpoint here
    processData(i);
  }
}

//////////////////////////////

function gsbutton() {
  fetch('./getstarted.json');
};

/////////////////////////////

function calculateSum(a, b) {
  console.log('Calculating sum...');
  console.log('a:', a);
  console.log('b:', b);
  console.log('Sum:', a + b);
  return a + b;
}

//////////////////////////////

// Add a logpoint by right-clicking the line number and selecting 'Add logpoint'
// Instead of using console.log, you can add a message like:
// "Value of x is: {x}" or "User clicked button at {new Date()}"
function calculateTotal(price, quantity) {
  let total = price * quantity;  // Add logpoint here
  return total;
}

/////////////////////////////

function coughtexbutton() {
  try {
    null[0];
  } catch (error) {
    console.error(error);
  }
};

function uncoughtexbutton() {
  null[0];
};

/////////////////////

function downloadFiles() {
  const files = ['index.html', 'index.js', 'index2.js', 'styles.css'];
  files.forEach(file => {
    fetch(file)
      .then(response => response.text())
      .then(content => {
        const blob = new Blob([content], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = file;
        a.click();
        URL.revokeObjectURL(a.href);
      });
  });
}

////////////////////////////////////////////

function demoAsyncStep() {
  console.log('outside - before timeout');
  setTimeout(() => {
    console.log('inside timeout - after 3 seconds');
    const result = processAsyncResult();
    console.log('processed result:', result);
  }, 3000);
  console.log('outside - after timeout call');

  function processAsyncResult() {
    return 'async operation completed';
  }
}