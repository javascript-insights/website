document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('simulateCrash').addEventListener('click', () => {
    simulateCrash();
  });
});

function simulateCrash() {
  // Simulate a crash scenario
  console.log('Simulating crash...');
  null[0];
}

window.onerror = function (message, source, line, column, error) {
  // Get the stack trace from the error object.
  const stackTrace = error.stack;

  console.error('An error occurred:', message, 'at', source, line, column, 'with stack trace:', stackTrace);

  const crashOutputDiv = document.getElementById('crashOutput');
  crashOutputDiv.textContent = 'Simulated crash occurred! Stack trace: ' + stackTrace;
  // Send the stack trace to your telemetry system.
  // Code not shown.
};