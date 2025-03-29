window.addEventListener("load", function foo() {
  document.getElementById('demo-form').addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Form submitted!');
  });

  document.getElementById('animated-box-2').addEventListener('mouseover', function (event) {
    event.preventDefault();
    animateBox2();
  });
});

function shiftLayout() {
  const section = document.getElementById('layout-shift');
  section.style.marginTop = section.style.marginTop === '50px' ? '0' : '50px';
}

function addToCart() {
  const cartStatus = document.getElementById('cart-status');
  cartStatus.textContent = 'Item added to cart!';
}

let currentImageIndex = 0;

function nextImage() {
  const images = document.querySelectorAll('.carousel img');
  currentImageIndex = (currentImageIndex + 1) % images.length;
  images.forEach((img, index) => {
    img.style.transform = `translateX(-${currentImageIndex * 100}px)`;
  });
}

function animateBox1() {
  const box = document.querySelector('.animated-box-1');
  box.style.transform = 'translateX(200px)';
  setTimeout(() => {
    box.style.transform = 'translateX(0)';
  }, 1000);
}

function animateBox2() {
  const box = document.querySelector('.animated-box-2');
  box.style.transform = 'translateX(200px)';
  setTimeout(() => {
    box.style.transform = 'translateX(0)';
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  // Paint flashing demo
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  window.getRandomColor = getRandomColor;

  // Layout shift demo
  const shiftBtn = document.getElementById('shift-btn');
  const layoutShiftDemo = document.querySelector('.layout-shift-demo');

  if (shiftBtn && layoutShiftDemo) {
    shiftBtn.addEventListener('click', () => {
      const isExpanded = layoutShiftDemo.classList.contains('expanded');

      if (isExpanded) {
        layoutShiftDemo.classList.remove('expanded');
        layoutShiftDemo.style.width = '200px';
        layoutShiftDemo.style.height = '100px';
        layoutShiftDemo.textContent = 'Click to expand';
      } else {
        layoutShiftDemo.classList.add('expanded');
        layoutShiftDemo.style.width = '600px';
        layoutShiftDemo.style.height = '300px';
        layoutShiftDemo.textContent = 'Click to shrink';
      }

      // Force reflow to make layout shift more visible
      document.body.offsetHeight;
    });
  }

  // Simulate dynamically loaded content
  setTimeout(() => {
    const dynamicContent = document.createElement('div');
    dynamicContent.className = 'dynamic-content';
    dynamicContent.textContent = 'Dynamic Content';
    document.querySelector('#new-element').appendChild(dynamicContent);
  }, 2000);

  // FPS Meter Animation demo
  const animationToggle = document.getElementById('animation-toggle');
  const movingElement = document.querySelector('.moving-element');
  let animationId = null;
  let animationRunning = false;

  if (animationToggle && movingElement) {
    function animateElement() {
      const container = document.querySelector('.animation-container');
      const containerWidth = container.offsetWidth;
      let position = 0;
      let direction = 1;

      function step() {
        position += 5 * direction;

        // Bounce when hitting the edges
        if (position >= containerWidth - 50) {
          direction = -1;
        } else if (position <= 0) {
          direction = 1;
        }

        movingElement.style.left = `${position}px`;
        animationId = requestAnimationFrame(step);
      }

      return requestAnimationFrame(step);
    }

    animationToggle.addEventListener('click', () => {
      if (animationRunning) {
        cancelAnimationFrame(animationId);
        animationToggle.textContent = 'Start Animation';
        animationRunning = false;
      } else {
        animationId = animateElement();
        animationToggle.textContent = 'Stop Animation';
        animationRunning = true;
      }
    });
  }

  // Scrolling performance issues demo
  const scrollContainer = document.getElementById('scroll-container');
  const scrollItems = document.querySelector('.scroll-items');

  if (scrollContainer && scrollItems) {
    // Create 50 colored items to scroll through
    for (let i = 0; i < 50; i++) {
      const item = document.createElement('div');
      item.style.height = '50px';
      item.style.margin = '10px 0';
      item.style.backgroundColor = `hsl(${i * 7}, 80%, 60%)`;
      item.textContent = `Scroll Item ${i + 1}`;
      item.style.color = 'white';
      item.style.display = 'flex';
      item.style.alignItems = 'center';
      item.style.justifyContent = 'center';
      item.style.borderRadius = '5px';
      scrollItems.appendChild(item);
    }

    // Intentionally inefficient scroll handler for demonstration
    scrollContainer.addEventListener('scroll', () => {
      // Forced synchronous layout - bad practice shown for demonstration
      const height = scrollContainer.scrollHeight;

      // Simulate heavy calculation
      for (let i = 0; i < 100; i++) {
        const dummy = document.body.offsetHeight * document.body.offsetWidth / (i + 1);
      }

      // Modify DOM during scroll - also a bad practice shown for demonstration
      const scrollPercentage = Math.round((scrollContainer.scrollTop / (height - scrollContainer.clientHeight)) * 100);
      if (scrollPercentage % 10 === 0) {
        scrollContainer.style.backgroundColor = `rgba(255, ${255 - scrollPercentage * 2}, ${255 - scrollPercentage * 2}, 0.1)`;
      }
    });
  }
});