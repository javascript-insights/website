window.addEventListener("load", function () {
});

//////////////////////////////////////////////////////////////

// Local Storage
function setLocalStorage() {
  localStorage.setItem('localData', 'This is a local storage item');
}

function getLocalStorage() {
  const output = localStorage.getItem('localData');
  alert(output ? `Stored: ${output}` : 'No data stored');
}

//////////////////////////////////////////////////////////////

// Session Storage
function setSessionStorage() {
  sessionStorage.setItem('sessionData', 'This is a session storage item');
}

function getSessionStorage() {
  const output = sessionStorage.getItem('sessionData');
  alert(output ? `Stored: ${output}` : 'No data stored');
}

//////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////

const API_BASE = 'https://javascript-insights-server-azf4hfbxetbnd4gy.israelcentral-01.azurewebsites.net'; // Adjust this to your server URL

async function setDefaultCookies() {
  try {
    const response = await fetch(`${API_BASE}/cookies/`, {
      credentials: 'include'
    });
    const data = await response.json();
    displayResult(data);
  } catch (error) {
    displayResult(error);
  }
}

async function setCustomCookie() {
  const name = document.getElementById('cookieName').value;
  const value = document.getElementById('cookieValue').value;
  const crossOrigin = document.getElementById('crossOrigin').checked;
  const httpOnly = document.getElementById('httpOnly').checked;
  const secure = document.getElementById('secure').checked;
  const sameSite = document.getElementById('sameSite').value;

  const options = {
    crossOrigin,
    httpOnly,
    secure,
    sameSite,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  };

  try {
    const response = await fetch(`${API_BASE}/cookies/set`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ name, value, options })
    });
    const data = await response.json();
    displayResult(data);
  } catch (error) {
    displayResult(error);
  }
}

async function readCookies() {
  try {
    const response = await fetch(`${API_BASE}/cookies/read`, {
      credentials: 'include'
    });
    const data = await response.json();
    displayResult(data);
  } catch (error) {
    displayResult(error);
  }
}

async function clearCookie() {
  const name = document.getElementById('cookieToClear').value;
  try {
    const response = await fetch(`${API_BASE}/cookies/clear/${name}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const data = await response.json();
    displayResult(data);
  } catch (error) {
    displayResult(error);
  }
}

function displayResult(result) {
  document.getElementById('cookieDisplay').textContent =
    JSON.stringify(result, null, 2);
}

//////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////

// Cache Storage
async function cacheResource() {
  if ('caches' in window) {
    const cache = await caches.open('demo-cache-theoretical-1');
    //await cache.add('/static/favicon.png');
    await cache.add('./getstarted.json');
    alert('Resource cached successfully');
  } else {
    alert('Cache Storage not supported');
  }
}

function gsbutton() {
  // Try to get the resource from cache first
  caches.match('./getstarted.json')
    .then(response => {
      if (response) {
        // If found in cache, return the cached response
        console.log('Found in cache:', response);
        return response;
      }
      // If not in cache, fetch from network
      console.log('Not found in cache, fetching from network');
      return fetch('./getstarted.json');
    })
    .catch(error => {
      console.error('Error retrieving from cache:', error);
      // Fallback to network request if cache access fails
      return fetch('./getstarted.json');
    });
};


function fetchDataDemo() {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  const statusEl = document.getElementById('cacheStatus');
  const resultEl = document.getElementById('fetchResult');

  statusEl.textContent = 'Fetching data...';

  // First try to get the data from cache
  caches.match(url)
    .then(cachedResponse => {
      if (cachedResponse) {
        // If we found data in the cache, use it
        statusEl.textContent = 'Data retrieved from cache!';
        return cachedResponse.json();
      }
      // If not in cache, fetch from network
      statusEl.textContent = 'Cache miss, fetching from network...';
      throw new Error('Cache miss');
    })
    .then(data => {
      resultEl.style.display = 'block';
      resultEl.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
      return; // Skip the network fetch below
    })
    .catch(error => {
      if (error.message !== 'Cache miss') {
        statusEl.textContent = 'Error accessing cache: ' + error.message;
      }
      // Continuing with the network fetch
      fetch(url)
        .then(response => response.json())
        .then(data => {
          statusEl.textContent = 'Data fetched successfully!';
          resultEl.style.display = 'block';
          resultEl.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
        })
        .catch(error => {
          statusEl.textContent = 'Error fetching data: ' + error.message;
        });
    });
}

function cacheDataDemo() {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  const statusEl = document.getElementById('cacheStatus');
  const cacheName = 'demo-cache-v1';

  statusEl.textContent = 'Caching data...';

  caches.open(cacheName)
    .then(cache => {
      return cache.add(url)
        .then(() => {
          statusEl.textContent = 'Data cached successfully! Try fetching while offline.';
        });
    })
    .catch(error => {
      statusEl.textContent = 'Error caching data: ' + error.message;
    });
}

//////////////////////////////////////////////////////////////

// Storage Buckets
let storageBuckets = {};

function createBucket() {
  const bucketName = 'bucketName';
  if (bucketName) {
    storageBuckets[bucketName] = {};
    alert(`Bucket "${bucketName}" created.`);
  } else {
    alert('Please enter a bucket name.');
  }
}

function storeDataInBucket() {
  const bucketName = 'bucketName';
  const data = 'bucketData';
  if (bucketName && data) {
    if (storageBuckets[bucketName]) {
      storageBuckets[bucketName][Date.now()] = data;
      alert(`Data stored in bucket "${bucketName}".`);
    } else {
      alert(`Bucket "${bucketName}" does not exist.`);
    }
  } else {
    alert('Please enter both bucket name and data.');
  }
}