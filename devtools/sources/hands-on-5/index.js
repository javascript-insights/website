document.addEventListener('DOMContentLoaded', () => {
    // Exercise 1: Vanishing Button
    const vanishingButton = document.getElementById('vanishingButton');
    vanishingButton.addEventListener('click', () => {
      vanishingButton.style.backgroundColor = 'purple';
      setTimeout(() => {
        vanishingButton.style.backgroundColor = '';
      }, 500);
    });

    // Exercise 2: Counter
    const countButton = document.getElementById('countButton');
    const counterDisplay = document.getElementById('counter');
    let count = 0;
    countButton.addEventListener('click', () => {
      count += 2; // Bug: Incrementing by 2 instead of 1
      counterDisplay.textContent = count;
    });

    // Exercise 3: Array Transform
    const arrayButton = document.getElementById('arrayButton');
    arrayButton.addEventListener('click', () => {
      let numbers = [1, 2, 3, 4, 5];
      console.log('Original array:', numbers);
      
      numbers = numbers.map(n => n * 2);
      console.log('After multiplication:', numbers);
      
      numbers = numbers.filter(n => n > 5);
      console.log('After filtering:', numbers);
    });
  });