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

  document.querySelector('#gsbutton').addEventListener("click", () => {
    fetch('./getstarted.json');
  });

  document.querySelector('#coughtexbutton').addEventListener("click", () => {
    try {
      null[0];
    } catch (error) {
      console.error(error);
    }
  });

  document.querySelector('#uncoughtexbutton').addEventListener("click", () => {
    null[0];
  });

  (function qux() {
    document.querySelector('#cs').addEventListener("click", function baz() {
      window.cs();
    });
  })();
});