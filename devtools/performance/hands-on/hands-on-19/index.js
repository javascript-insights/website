// Creates many divs to demonstrate DOM manipulation performance
function createManyDivs() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    for (let i = 0; i < 10000; i++) {
        const div = document.createElement('div');
        div.textContent = `Div ${i}`;
        container.appendChild(div);
    }
}

// Creates a CPU-intensive animation
function startHeavyAnimation() {
    const spinner = document.getElementById('spinner');
    let rotation = 0;

    function animate() {
        rotation += 2;
        spinner.style.transform = `rotate(${rotation}deg)`;

        // Simulate heavy calculation
        for (let i = 0; i < 100000; i++) {
            Math.random() * Math.random();
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// Loads multiple large images
function loadManyImages() {
    const container = document.getElementById('imageContainer');
    const imageUrls = Array(10).fill('https://picsum.photos/1000/1000');

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        container.appendChild(img);
    });
}

// Demonstrates a memory leak
function startMemoryLeak() {
    let leakedData = [];

    setInterval(() => {
        leakedData.push(new Array(10000).fill('leaking memory'));
    }, 100);
}

// Creates a colorful cascading animation effect
function startColorCascade() {
    const container = document.getElementById('rainbowContainer');
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    let count = 0;

    setInterval(() => {
      for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        div.style.width = '10px';
        div.style.height = '10px';
        div.style.backgroundColor = colors[count % colors.length];
        div.style.position = 'absolute';
        div.style.left = `${Math.random() * window.innerWidth}px`;
        div.style.top = '0';
        container.appendChild(div);

        // Animate falling
        let top = 0;
        const fall = setInterval(() => {
          top += 2;
          div.style.top = `${top}px`;
          if (top > window.innerHeight) {
            div.remove();
            clearInterval(fall);
          }
        }, 16);
      }
      count++;
    }, 100);
  }

  // Calculates a huge Fibonacci number inefficiently
  function calculateHugeFibonacci() {
    function fib(n) {
      if (n <= 1) return n;
      return fib(n - 1) + fib(n - 2);
    }
    
    const result = fib(40); // Using 40 instead of 1000000 to prevent complete browser freeze
    alert(`Fibonacci calculation complete: ${result}`);
  }

  // Creates rapid DOM updates causing layout thrashing
  function startDOMParty() {
    const partyZone = document.getElementById('partyZone');
    const elements = [];

    // Create 100 elements
    for (let i = 0; i < 100; i++) {
      const el = document.createElement('div');
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.backgroundColor = `hsl(${i * 3.6}, 100%, 50%)`;
      el.style.position = 'absolute';
      partyZone.appendChild(el);
      elements.push(el);
    }

    function animate() {
      elements.forEach((el) => {
        el.style.left = `${Math.random() * window.innerWidth}px`;
        el.style.top = `${Math.random() * 200}px`;
        el.offsetHeight; // Force layout recalculation
      });
      requestAnimationFrame(animate);
    }

    animate();
  }

  // Creates many simultaneous events and timers
  function startEventLoopChaos() {
    const display = document.getElementById('eventDisplay');
    let counter = 0;

    // Create multiple intervals
    for (let i = 0; i < 100; i++) {
      setInterval(() => {
        counter++;
        const div = document.createElement('div');
        div.textContent = `Event ${counter}`;
        display.appendChild(div);
        
        // Remove after 1 second
        setTimeout(() => {
          div.remove();
        }, 1000);
        
        // Trigger layout
        display.offsetHeight;
      }, Math.random() * 1000);
    }

    // Add some CPU work
    setInterval(() => {
      Array(10000).fill(0).map(Math.random);
    }, 100);
  }
