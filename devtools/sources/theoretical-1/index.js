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
    var addend1 = getNumber1();
    var addend2 = getNumber2();
    var sum = addend1 + addend2;
    label.textContent = addend1 + " + " + addend2 + " = " + sum;
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

//////////////////////////////

function gsbutton() {
  fetch('./getstarted.json');
};

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

///////////////////////

function qux() {
  (function baz() {
    window.cs();
  })();
}

function modifyDOM() {
  const element = document.getElementById('targetElement');
  element.textContent = 'DOM Modified!';
  element.style.backgroundColor = '#ffeb3b';
}


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