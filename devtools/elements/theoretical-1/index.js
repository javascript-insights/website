window.addEventListener("load", function () {

  var noButton = document.getElementById("no-button");
  noButton.addEventListener("mouseover", () => {
    noButton.setAttribute("style", `position: absolute; left: ${Math.random() * 200}px; top: ${Math.random() * 200}px`);
  });

  function updateStatus() {
    const statusElement = document.getElementById('status');
    if (document.hasFocus()) {
      statusElement.textContent = 'Page is in focus';
      statusElement.style.color = 'green';
    } else {
      statusElement.textContent = 'Page is out of focus';
      statusElement.style.color = 'red';
    }
  }

  window.addEventListener('focus', updateStatus);
  window.addEventListener('blur', updateStatus);

  // Initial check
  updateStatus();

  const tooltipElement = document.getElementById('tooltipElement');
  const tooltipText = document.getElementById('tooltipText');

  tooltipElement.addEventListener('mouseover', () => {
    tooltipText.style.visibility = 'visible';
    tooltipText.style.opacity = '1';
  });

  tooltipElement.addEventListener('mouseout', () => {
    tooltipText.style.visibility = 'hidden';
    tooltipText.style.opacity = '0';
  });

  const mouseover = document.getElementById('mouseover');

  mouseover.addEventListener('click', () => {
    console.log('Something was done');
  });
});

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const el = document.querySelector('#FreezeIt3000');
    el.style.animation = 'flash 1s';
    setTimeout(() => el.style.animation = '', 500);
  });
}
