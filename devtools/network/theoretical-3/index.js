window.addEventListener("DOMContentLoaded", function foo() {

  // document.getElementById('fetchData').addEventListener('click', fetchData);
  // document.getElementById('postData').addEventListener('click', postData);
  // document.getElementById('fetchError').addEventListener('click', fetchError);
  // document.getElementById('postError').addEventListener('click', postError);
  // document.getElementById('fetchDataUrl').addEventListener('click', fetchDataUrl);

  document.getElementById('swFetchData').addEventListener('click', swFetchData);

  document.getElementById('connectWebSocket').addEventListener('click', connectWebSocket);
  document.getElementById('sendMessage').addEventListener('click', sendMessage);
  document.getElementById('closeWebSocket').addEventListener('click', closeWebSocket);

  document.getElementById('startEventStream').addEventListener('click', startEventStream);
  document.getElementById('stopEventStream').addEventListener('click', stopEventStream);

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

  // Service Worker
  var controller;

  // Register the service worker
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

  function swFetchData() {
    if (controller) {
      controller.postMessage('fetchDataMessage');
    }
  }

  // websocket

  let socket;

  function connectWebSocket() {
    socket = new WebSocket('wss://echo.websocket.org');
    socket.onopen = () => {
      document.getElementById('webSocketStatus').innerText = 'Status: Connected';
    };
    socket.onmessage = (event) => {
      const messagesDiv = document.getElementById('messages');
      const message = document.createElement('div');
      message.innerText = `Received: ${event.data}`;
      messagesDiv.appendChild(message);
    };
    socket.onclose = () => {
      document.getElementById('webSocketStatus').innerText = 'Status: Disconnected';
    };
  }

  function sendMessage() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = 'Hello WebSocket!';
      socket.send(message);
      const messagesDiv = document.getElementById('messages');
      const messageDiv = document.createElement('div');
      messageDiv.innerText = `Sent: ${message}`;
      messagesDiv.appendChild(messageDiv);
    }
  }

  function closeWebSocket() {
    if (socket) {
      socket.close();
    }
  }

  // Event Stream

  let eventSource;

  function startEventStream() {
    eventSource = new EventSource('https://stream.wikimedia.org/v2/stream/recentchange');
    eventSource.onopen = () => {
      document.getElementById('eventStreamStatus').innerText = 'Status: Connected';
    };
    eventSource.onmessage = (event) => {
      const message = document.createElement('div');
      // message.innerText = `Message: ${event.data}`;
      // document.getElementById('eventMessages').appendChild(message);
    };
    eventSource.onerror = () => {
      document.getElementById('eventStreamStatus').innerText = 'Status: Error';
    };
  }

  function stopEventStream() {
    if (eventSource) {
      eventSource.close();
      document.getElementById('eventStreamStatus').innerText = 'Status: Disconnected';
    }
  }
});
