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
    .find(row => row.startsWith('clientCookie='))
    ?.split('=')[1];
  alert(cookieValue ? `clientCookie=${cookieValue}` : 'No client cookie found');
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
  const statusEl = document.getElementById('privateTokenStatus');

  // Check if the Private State Tokens API is available
  if ('hasPrivateToken' in document) {
    try {
      // Attempt to check for an existing private state token
      const hasToken = await document.hasPrivateToken('https://example.com');
      statusEl.textContent = `✅ API available! Token check result: ${hasToken ? 'Token exists' : 'No token found'}.`;
      statusEl.style.color = '#2e7d32';
      alert(
        `Private State Tokens API is available!\n\n` +
        `Token exists for issuer: ${hasToken}\n\n` +
        `📌 Open DevTools → Application → Private State Tokens to explore.\n\n` +
        `Note: Full token issuance requires a configured issuer server with proper cryptographic keys.`
      );
    } catch (error) {
      statusEl.textContent = `⚠️ API available but: ${error.message}`;
      statusEl.style.color = '#e65100';
      alert(
        `Private State Tokens API is available but encountered an error:\n${error.message}\n\n` +
        `📌 Open DevTools → Application → Private State Tokens to explore this section.\n\n` +
        `This is expected — full issuance requires an HTTPS issuer server.`
      );
    }
  } else {
    statusEl.textContent = '❌ Private State Tokens API not supported in this browser.';
    statusEl.style.color = '#c62828';
    alert(
      'Private State Tokens API is not supported in this browser.\n\n' +
      'Try Chrome 117+ with HTTPS.\n\n' +
      '📌 You can still view the Private State Tokens section in DevTools → Application panel.'
    );
  }
}

// Interest Groups (Protected Audience API)
async function joinInterestGroup() {
  const statusEl = document.getElementById('interestGroupStatus');

  if ('joinAdInterestGroup' in navigator) {
    try {
      const interestGroup = {
        owner: window.location.origin,
        name: 'devtools-demo-group',
        lifetimeMs: 30 * 24 * 60 * 60 * 1000, // 30 days
        ads: [
          {
            renderURL: window.location.origin + '/demo-ad.html',
            metadata: { type: 'demo', category: 'web-development' }
          }
        ],
        userBiddingSignals: {
          interest: 'browser-devtools',
          skill_level: 'expert'
        }
      };

      await navigator.joinAdInterestGroup(interestGroup, interestGroup.lifetimeMs);
      statusEl.textContent = '✅ Joined interest group "devtools-demo-group"!';
      statusEl.style.color = '#2e7d32';
      alert(
        `Successfully joined Interest Group "devtools-demo-group"!\n\n` +
        `📌 Open DevTools → Application → Interest Groups to see it.\n\n` +
        `Group details:\n` +
        `- Owner: ${interestGroup.owner}\n` +
        `- Lifetime: 30 days\n` +
        `- Bidding signals: ${JSON.stringify(interestGroup.userBiddingSignals)}`
      );
    } catch (error) {
      statusEl.textContent = `⚠️ Error: ${error.message}`;
      statusEl.style.color = '#e65100';
      alert(
        `Error joining Interest Group: ${error.message}\n\n` +
        `📌 This API requires:\n` +
        `- HTTPS origin\n` +
        `- Privacy Sandbox APIs enabled\n` +
        `- Chrome 115+\n\n` +
        `You can still explore Application → Interest Groups in DevTools.`
      );
    }
  } else {
    statusEl.textContent = '❌ Protected Audience API not supported in this browser.';
    statusEl.style.color = '#c62828';
    alert(
      'Protected Audience API (Interest Groups) is not supported.\n\n' +
      'Try Chrome 115+ with HTTPS and Privacy Sandbox enabled.\n\n' +
      '📌 You can still explore the Interest Groups section in DevTools → Application panel.'
    );
  }
}

async function leaveInterestGroup() {
  const statusEl = document.getElementById('interestGroupStatus');

  if ('leaveAdInterestGroup' in navigator) {
    try {
      await navigator.leaveAdInterestGroup({
        owner: window.location.origin,
        name: 'devtools-demo-group'
      });
      statusEl.textContent = '✅ Left interest group "devtools-demo-group".';
      statusEl.style.color = '#2e7d32';
      alert('Left the interest group "devtools-demo-group". Check DevTools → Application → Interest Groups.');
    } catch (error) {
      statusEl.textContent = `⚠️ Error: ${error.message}`;
      statusEl.style.color = '#e65100';
      alert(`Error leaving Interest Group: ${error.message}`);
    }
  } else {
    statusEl.textContent = '❌ API not supported.';
    statusEl.style.color = '#c62828';
    alert('Protected Audience API is not supported in this browser.');
  }
}

// Shared Storage
async function saveToSharedStorage() {
  const statusEl = document.getElementById('sharedStorageStatus');

  if ('sharedStorage' in window) {
    try {
      // Write multiple key-value pairs to shared storage
      await window.sharedStorage.set('demo-greeting', 'Hello from Shared Storage! ' + new Date().toLocaleString());
      await window.sharedStorage.set('user-preference', 'dark-mode');
      await window.sharedStorage.set('visit-count', String(Math.floor(Math.random() * 100)));
      await window.sharedStorage.set('favorite-tool', 'DevTools Application Panel');
      await window.sharedStorage.set('course-topic', 'Browser DevTools Mastery');

      // Also demonstrate append operation
      await window.sharedStorage.append('activity-log', ` | visited at ${new Date().toLocaleTimeString()}`);

      statusEl.textContent = '✅ 6 items saved to Shared Storage!';
      statusEl.style.color = '#2e7d32';
      alert(
        `Data saved to Shared Storage!\n\n` +
        `📌 Open DevTools → Application → Shared Storage to see the entries.\n\n` +
        `Keys stored:\n` +
        `- demo-greeting\n` +
        `- user-preference\n` +
        `- visit-count\n` +
        `- favorite-tool\n` +
        `- course-topic\n` +
        `- activity-log (appended)\n\n` +
        `Note: Shared Storage values can only be READ inside a worklet (privacy protection), ` +
        `but you can see the keys in DevTools!`
      );
    } catch (error) {
      statusEl.textContent = `⚠️ Error: ${error.message}`;
      statusEl.style.color = '#e65100';
      alert(`Error saving to Shared Storage: ${error.message}\n\nThis API requires HTTPS and Chrome 117+.`);
    }
  } else {
    statusEl.textContent = '❌ Shared Storage API not supported in this browser.';
    statusEl.style.color = '#c62828';
    alert(
      'Shared Storage API is not supported in this browser.\n\n' +
      'Try Chrome 117+ with HTTPS.\n\n' +
      '📌 You can still explore Application → Shared Storage in DevTools.'
    );
  }
}

async function deleteFromSharedStorage() {
  const statusEl = document.getElementById('sharedStorageStatus');

  if ('sharedStorage' in window) {
    try {
      await window.sharedStorage.delete('demo-greeting');
      statusEl.textContent = '✅ Deleted "demo-greeting" from Shared Storage.';
      statusEl.style.color = '#2e7d32';
      alert('Deleted "demo-greeting" from Shared Storage.\n\n📌 Check DevTools → Application → Shared Storage.');
    } catch (error) {
      statusEl.textContent = `⚠️ Error: ${error.message}`;
      statusEl.style.color = '#e65100';
      alert(`Error deleting from Shared Storage: ${error.message}`);
    }
  } else {
    statusEl.textContent = '❌ API not supported.';
    statusEl.style.color = '#c62828';
    alert('Shared Storage API is not supported in this browser.');
  }
}

async function clearSharedStorage() {
  const statusEl = document.getElementById('sharedStorageStatus');

  if ('sharedStorage' in window) {
    try {
      await window.sharedStorage.clear();
      statusEl.textContent = '✅ Cleared all Shared Storage data.';
      statusEl.style.color = '#2e7d32';
      alert('All Shared Storage data cleared!\n\n📌 Check DevTools → Application → Shared Storage.');
    } catch (error) {
      statusEl.textContent = `⚠️ Error: ${error.message}`;
      statusEl.style.color = '#e65100';
      alert(`Error clearing Shared Storage: ${error.message}`);
    }
  } else {
    statusEl.textContent = '❌ API not supported.';
    statusEl.style.color = '#c62828';
    alert('Shared Storage API is not supported in this browser.');
  }
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
async function createBucket() {
  const statusEl = document.getElementById('bucketStatus');

  if ('storageBuckets' in navigator) {
    try {
      // Create a storage bucket with specific options
      const bucket = await navigator.storageBuckets.open('demo-treasure-bucket', {
        durability: 'strict',
        persisted: true,
        title: 'Demo Treasure Bucket'
      });

      // Also create a second bucket to show multiple buckets in DevTools
      const bucket2 = await navigator.storageBuckets.open('demo-temp-bucket', {
        durability: 'relaxed',
        persisted: false,
        title: 'Temporary Demo Bucket'
      });

      statusEl.textContent = '✅ Created 2 storage buckets!';
      statusEl.style.color = '#2e7d32';
      alert(
        `Storage Buckets created successfully!\n\n` +
        `📌 Open DevTools → Application → Storage Buckets to see them.\n\n` +
        `Buckets created:\n` +
        `1. "demo-treasure-bucket" (durable, persisted)\n` +
        `2. "demo-temp-bucket" (relaxed, not persisted)\n\n` +
        `Each bucket has its own isolated IndexedDB, Cache Storage, and other storage.`
      );
    } catch (error) {
      statusEl.textContent = `⚠️ Error: ${error.message}`;
      statusEl.style.color = '#e65100';
      alert(`Error creating bucket: ${error.message}\n\nStorage Buckets API requires Chrome 122+ with HTTPS.`);
    }
  } else {
    statusEl.textContent = '❌ Storage Buckets API not supported in this browser.';
    statusEl.style.color = '#c62828';
    alert(
      'Storage Buckets API is not supported in this browser.\n\n' +
      'Try Chrome 122+ with HTTPS.\n\n' +
      '📌 You can still explore Application → Storage Buckets in DevTools.'
    );
  }
}

async function storeDataInBucket() {
  const statusEl = document.getElementById('bucketStatus');

  if ('storageBuckets' in navigator) {
    try {
      // Open the bucket
      const bucket = await navigator.storageBuckets.open('demo-treasure-bucket', {
        title: 'Demo Treasure Bucket'
      });

      // Use IndexedDB within the bucket
      const root = bucket.indexedDB;
      const dbRequest = root.open('treasure-db', 1);

      dbRequest.onupgradeneeded = function (event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('treasures')) {
          db.createObjectStore('treasures', { keyPath: 'id', autoIncrement: true });
        }
      };

      dbRequest.onsuccess = function (event) {
        const db = event.target.result;
        const tx = db.transaction('treasures', 'readwrite');
        const store = tx.objectStore('treasures');

        const treasureItems = [
          { value: '💎 Diamond of Knowledge', discoveredAt: new Date().toLocaleString() },
          { value: '🏆 Trophy of Debugging', discoveredAt: new Date().toLocaleString() },
          { value: '📜 Scroll of DevTools Wisdom', discoveredAt: new Date().toLocaleString() }
        ];

        treasureItems.forEach(item => store.add(item));

        tx.oncomplete = function () {
          statusEl.textContent = '✅ 3 treasures buried in the bucket!';
          statusEl.style.color = '#2e7d32';
          alert(
            `Treasures stored in bucket "demo-treasure-bucket"!\n\n` +
            `📌 In DevTools → Application → Storage Buckets → demo-treasure-bucket → IndexedDB\n` +
            `   you can see the "treasure-db" database with the stored items.\n\n` +
            `Items stored:\n` +
            treasureItems.map(t => `- ${t.value}`).join('\n')
          );
        };
      };

      dbRequest.onerror = function () {
        statusEl.textContent = `⚠️ Error opening IndexedDB in bucket.`;
        statusEl.style.color = '#e65100';
      };

      // Also store something in the bucket's cache storage
      const cache = await bucket.caches.open('bucket-cache');
      await cache.put(
        new Request('/bucket-demo-data'),
        new Response(JSON.stringify({ message: 'Cached inside a storage bucket!', time: Date.now() }), {
          headers: { 'Content-Type': 'application/json' }
        })
      );

    } catch (error) {
      statusEl.textContent = `⚠️ Error: ${error.message}`;
      statusEl.style.color = '#e65100';
      alert(`Error storing data in bucket: ${error.message}`);
    }
  } else {
    statusEl.textContent = '❌ Storage Buckets API not supported.';
    statusEl.style.color = '#c62828';
    alert('Storage Buckets API is not supported. Try Chrome 122+ with HTTPS.');
  }
}

async function listBuckets() {
  const statusEl = document.getElementById('bucketStatus');

  if ('storageBuckets' in navigator) {
    try {
      const buckets = await navigator.storageBuckets.keys();
      if (buckets.length === 0) {
        statusEl.textContent = '📭 No storage buckets found. Create one first!';
        statusEl.style.color = '#666';
        alert('No storage buckets found. Click "⛱️ Dig a Hole" to create one first!');
      } else {
        statusEl.textContent = `📋 Found ${buckets.length} bucket(s): ${buckets.join(', ')}`;
        statusEl.style.color = '#2e7d32';
        alert(
          `Found ${buckets.length} Storage Bucket(s):\n\n` +
          buckets.map((b, i) => `${i + 1}. ${b}`).join('\n') +
          `\n\n📌 View them in DevTools → Application → Storage Buckets`
        );
      }
    } catch (error) {
      statusEl.textContent = `⚠️ Error: ${error.message}`;
      statusEl.style.color = '#e65100';
      alert(`Error listing buckets: ${error.message}`);
    }
  } else {
    statusEl.textContent = '❌ Storage Buckets API not supported.';
    statusEl.style.color = '#c62828';
    alert('Storage Buckets API is not supported. Try Chrome 122+ with HTTPS.');
  }
}