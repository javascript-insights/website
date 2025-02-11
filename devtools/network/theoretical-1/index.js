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

  document.getElementById('fetchDataUrl').addEventListener('click', () => {
    fetch('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==')
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data URL:', error));
  });

  // websocket

  let socket;

  document.getElementById('connectWebSocket').addEventListener('click', () => {
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
  });

  document.getElementById('sendMessage').addEventListener('click', () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = 'Hello WebSocket!';
      socket.send(message);
      const messagesDiv = document.getElementById('messages');
      const messageDiv = document.createElement('div');
      messageDiv.innerText = `Sent: ${message}`;
      messagesDiv.appendChild(messageDiv);
    }
  });

  document.getElementById('closeWebSocket').addEventListener('click', () => {
    if (socket) {
      socket.close();
    }
  });

  // Event Stream

  let eventSource;

  document.getElementById('startEventStream').addEventListener('click', () => {
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
  });

  document.getElementById('stopEventStream').addEventListener('click', () => {
    if (eventSource) {
      eventSource.close();
      document.getElementById('eventStreamStatus').innerText = 'Status: Disconnected';
    }
  });
});
