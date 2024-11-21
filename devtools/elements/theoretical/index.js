window.addEventListener("load", function () {

  var noButton = document.getElementById("no-button");
  noButton.addEventListener("mouseover", () => {
    noButton.setAttribute("style", `position: absolute; left: ${Math.random() * 200}px; top: ${Math.random() * 200}px`);
  });
});