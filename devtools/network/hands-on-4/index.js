window.addEventListener("load", function () {

});

// Simulates a slow-loading resource
function loadSlowResource() {
    fetch('https://httpbin.org/delay/5')
        .then(response => response.json())
        .then(data => console.log('Slow resource loaded!'))
        .catch(error => console.error('Error:', error));
}

// Generates requests with random HTTP status codes
function generateRandomStatus() {
    const statusCodes = [200, 201, 301, 304, 400, 401, 403, 404, 500, 502, 503];
    const randomStatus = statusCodes[Math.floor(Math.random() * statusCodes.length)];
    fetch(`https://httpbin.org/status/${randomStatus}`)
        .then(response => {
            console.log(`Status code: ${response.status}`);
        })
        .catch(error => console.error('Error:', error));
}

// Sends request with custom headers
function sendWeirdHeaders() {
    fetch('https://httpbin.org/headers', {
        headers: {
            'X-Pizza-Topping': 'pineapple',
            'X-Secret-Dance-Move': 'moonwalk',
            'X-Debug-Mode': 'super-silly'
        }
    })
        .then(response => response.json())
        .then(data => console.log('Headers sent!'))
        .catch(error => console.error('Error:', error));
}

// Sends random JSON data
function sendRandomData() {
    const data = {
        randomNumber: Math.random() * 1000,
        funnyMessage: 'Why did the developer go broke? Because he used up all his cache!',
        timestamp: new Date().toISOString(),
        meaningOfLife: 42
    };

    fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => console.log('Data sent!'))
        .catch(error => console.error('Error:', error));
}

// Cache testing function
let cacheTestCounter = 0;
function testCaching() {
    const timestamp = new Date().getTime();
    fetch(`https://httpbin.org/cache/${cacheTestCounter % 2 === 0 ? '0' : '60'}`)
        .then(response => response.json())
        .then(data => console.log('Cache test complete!'))
        .catch(error => console.error('Error:', error));
    cacheTestCounter++;
}

// Load multiple resources in sequence
function loadManyResources() {
    Promise.all([
        fetch('https://httpbin.org/delay/1'),
        fetch('https://httpbin.org/delay/2'),
        fetch('https://httpbin.org/delay/0.5'),
        fetch('https://httpbin.org/delay/1.5')
    ]).then(responses => console.log('All resources loaded!'))
        .catch(error => console.error('Error:', error));
}

// Send mixed content types
function sendMixedContent() {
    // Send JSON as text/plain
    fetch('https://httpbin.org/anything', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify({ message: "I'm not really plain text!" })
    })
        .then(response => response.json())
        .then(data => console.log('Mixed content sent!'))
        .catch(error => console.error('Error:', error));
}

// Create a chain of redirects
function startRedirectChain() {
    fetch('https://httpbin.org/redirect/3')
        .then(response => response.json())
        .then(data => console.log('Redirect chain complete!'))
        .catch(error => console.error('Error:', error));
}

// Cookie game function
function playCookieGame() {
    fetch('https://httpbin.org/cookies/set', {
        headers: {
            'Cookie': `monster_favorite=chocolate_chip; 
            monster_mood=hungry; 
            cookies_eaten=${Math.floor(Math.random() * 100)}`
        }
    })
        .then(response => response.json())
        .then(data => console.log('Cookie monster fed!'))
        .catch(error => console.error('Error:', error));
}