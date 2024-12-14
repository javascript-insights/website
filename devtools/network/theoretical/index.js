window.addEventListener("load", function foo() {

  document.getElementById('fetchData').addEventListener('click', fetchData);
  document.getElementById('postData').addEventListener('click', postData);
  document.getElementById('fetchError').addEventListener('click', fetchError);
  document.getElementById('postError').addEventListener('click', postError);
  document.getElementById('swFetchData').addEventListener('click', swFetchData);

  function fetchData() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data:', error));
  }

  function postData() {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error posting data:', error));
  }

  function fetchError() {
    fetch('https://jsonplaceholder.typicode.com/invalid-url')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => console.log(data))
      .catch(error => console.error('Fetch error:', error));
  }

  function postError() {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: 'bad json' + JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => console.log(data))
      .catch(error => console.error('Post error:', error));
  }

  var controller;
  
  function swFetchData() {
    if (controller) {
      controller.postMessage('fetchData');
    }
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
        controller = navigator.serviceWorker.controller;
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  }
});
