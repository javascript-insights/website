window.addEventListener("load", function () {
});

// Cookies
function setClientCookie() {
  document.cookie = "clientCookie=This is a client-side cookie; expires=Thu, 18 Dec 2043 12:00:00 UTC; path=/";

};

function getClientCookie() {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('cookieData='))
    ?.split('=')[1];
  alert(document.cookie);
};

function setServerCookie() {
  fetch('https://api.stackexchange.com/2.3/users?order=desc&sort=reputation&site=stackoverflow')
    .then(response => response.text())
    .then(data => alert(data));
};

function getServerCookie() {
  fetch('https://api.stackexchange.com/2.3/users?order=desc&sort=reputation&site=stackoverflow')
    .then(response => response.text())
    .then(data => alert(data));
};

// Local Storage
function setLocalStorage() {
  localStorage.setItem('localData', 'This is a local storage item');
}

function getLocalStorage() {
  const output = localStorage.getItem('localData');
  alert(output ? `Stored: ${output}` : 'No data stored');
}

// Session Storage
function setSessionStorage() {
  sessionStorage.setItem('sessionData', 'This is a session storage item');
}

function getSessionStorage() {
  const output = sessionStorage.getItem('sessionData');
  alert(output ? `Stored: ${output}` : 'No data stored');
}

// IndexedDB
function setIndexedDB() {
  const request = indexedDB.open('storageDemo', 1);

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    db.createObjectStore('data', { keyPath: 'id', autoIncrement: true });
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction('data', 'readwrite');
    const store = transaction.objectStore('data');
    store.add({ value: 'This is an indexedDB item' });
  };
}

function getIndexedDB() {
  const request = indexedDB.open('storageDemo', 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction('data', 'readonly');
    const store = transaction.objectStore('data');
    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = function () {
      const output = getAllRequest.result.map(item => item.value).join(', ');
      alert(output ? `Stored: ${output}` : 'No data stored')
    };
  };
}

// Web SQL
function setWebSQL() {
  const db = openDatabase('storageDemo', '1.0', 'Demo DB', 2 * 1024 * 1024);

  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY, value TEXT)');
    tx.executeSql('INSERT INTO data (value) VALUES (?)', ['This is a Web SQL item']);
  });
}

function getWebSQL() {
  const db = openDatabase('storageDemo', '1.0', 'Demo DB', 2 * 1024 * 1024);

  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM data', [], function (tx, results) {
      const output = [];
      for (let i = 0; i < results.rows.length; i++) {
        output.push(results.rows.item(i).value);
      }
      alert(output.length ? `Stored: ${output.join(', ')}` : 'No data stored');
    });
  });
}

// Private State Tokens
async function generatePrivateStateToken() {
  // This is a placeholder as Private State Tokens are still experimental and not widely supported
  const token = 'example-private-state-token';
  alert(`Generated Token: ${token}`);
}

// Interest Groups
async function joinInterestGroup() {
  // This is a placeholder as Interest Groups are part of the Privacy Sandbox and not widely supported
  const group = 'example-interest-group';
  alert(`Joined Interest Group: ${group}`);
}

// Shared Storage
async function saveToSharedStorage() {
  // This is a placeholder as Shared Storage is still experimental and not widely supported
  const input = 'example-shared-data';
  const sharedStorage = 'example-shared-storage';
  alert(`Stored in Shared Storage: ${input}`);
}

// Cache Storage
async function cacheResource() {
  if ('caches' in window) {
    const cache = await caches.open('demo-cache');
    await cache.add('/static/favicon.png');
    alert('Resource cached successfully');
  } else {
    alert('Cache Storage not supported');
  }
}