window.addEventListener("load", function () {
  document.getElementById('testButton').addEventListener('click', () => {
    const result = document.getElementById('result');
    result.textContent = 'Processing...';
    setTimeout(() => {
      result.textContent = 'Interaction Complete!';
    }, 2000); // Simulated delay
  });
});