// Task: Optimize the performance of the page by making the following changes:

// 1. Lazy load images to improve initial load time.
// 2. Minimize the number of network requests by combining files where possible.
// 3. Use asynchronous loading for non-critical scripts.

// Example: Lazy loading an image
document.addEventListener("DOMContentLoaded", function() {
  const img = document.createElement('img');
  img.src = 'path/to/large-image.jpg';
  img.loading = 'lazy';
  document.body.appendChild(img);
});

// Example: Asynchronous loading of a script
const script = document.createElement('script');
script.src = 'path/to/non-critical-script.js';
script.async = true;
document.head.appendChild(script);

// Add your optimization code below: