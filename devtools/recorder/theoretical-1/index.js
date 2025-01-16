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