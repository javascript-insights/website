window.addEventListener("load", function foo() {

  document.getElementById('fetchData').addEventListener('click', fetchData);
  document.getElementById('postData').addEventListener('click', postData);
  document.getElementById('fetchError').addEventListener('click', fetchError);
  document.getElementById('postError').addEventListener('click', postError);
  document.getElementById('fetchDataUrl').addEventListener('click', fetchDataUrl);

  document.getElementById('user-agent-message').innerText = `Current User Agent: ${navigator.userAgent}`;

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

  function fetchDataUrl() {
    fetch('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==')
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data URL:', error));
  }

  // CORS Example
  function fetchDataCors(url, method = 'GET') {

    fetch(url, {
      method: method
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error in fetchDataCors:', error);
      });
  }

  const domain = 'https://javascript-insights-server-azf4hfbxetbnd4gy.israelcentral-01.azurewebsites.net';

  document.getElementById('fetchcors').addEventListener('click', () => fetchDataCors(domain + '/cors/specific-origin'));

});
