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
    const statusCodes = [200, 201, 301, 304, 400, 401, 403, 404, 500, 502, 503, 504, 418, 429];
    // Randomly select a status code
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
        meaningOfLife: 42,
        isDevToolsFun: true,
        link: 'https://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy'
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

// function playCookieGame1() {
//     const randomCookiesEaten = Math.floor(Math.random() * 100);
//     const cookieString = `monster_favorite=chocolate_chip; monster_mood=hungry; cookies_eaten=${randomCookiesEaten}`;

//     fetch('https://httpbin.org/cookies/set', {
//         headers: {
//             'Cookie': cookieString // Use the properly formatted string
//         }
//     })
//         .then(response => response.json())
//         .then(data => console.log('Cookie monster fed!', data)) // include the data in the console log
//         .catch(error => console.error('Error:', error));
// }

// function playCookieGame2() {
//     const randomCookiesEaten = Math.floor(Math.random() * 100);
//     const cookieString = `monster_favorite=chocolate_chip; monster_mood=hungry; cookies_eaten=${randomCookiesEaten}`;

//     fetch('https://httpbin.org/headers', { // Change url to /headers to see your headers
//         headers: {
//             'Cookie': cookieString,
//         }
//     })
//         .then(response => response.json()) // change response to json to see the headers
//         .then(data => console.log('Cookie monster headers:', data))
//         .catch(error => console.error('Error:', error));
// }

function playCookieGame1() {
    const randomCookiesEaten = Math.floor(Math.random() * 100);

    // Set cookie directly in browser
    document.cookie = `monster_favorite=chocolate_chip`;
    document.cookie = `monster_mood=hungry`;
    document.cookie = `cookies_eaten=${randomCookiesEaten}`;

    fetch('./cookies.json', {
        credentials: 'include' // Important: include credentials to send cookies
    })
        .then(response => response.json())
        .then(data => console.log('Cookie monster fed!', data))
        .catch(error => console.error('Error:', error));
}

function playCookieGame2() {
    const randomCookiesEaten = Math.floor(Math.random() * 100);

    fetch(`https://httpbin.org/cookies/set?monster_favorite=abadi&monster_mood=choked&cookies_eaten=${randomCookiesEaten}`, {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => console.log('Cookies set:', data))
        .catch(error => console.error('Error:', error));
}