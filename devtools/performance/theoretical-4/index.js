function cpuIntensiveTask() {
  let sum = 0;
  for (let i = 0; i < 1e7; i++) {
    sum += Math.sqrt(i);
  }
  document.getElementById('result').innerText = 'CPU Intensive Task Completed';
}

function simpleTask() {
  document.getElementById('result').innerText = 'Simple Task Completed';
}