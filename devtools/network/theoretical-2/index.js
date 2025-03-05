window.addEventListener("load", function foo() {

  // Register the service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  }

  // Fetch data from an API
  document.getElementById('fetch-data').addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data => {
        document.getElementById('data').innerText = JSON.stringify(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  });
});
