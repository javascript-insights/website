window.addEventListener("load", function () {
    // Set up event listeners for all buttons
    document.getElementById('loadData')?.addEventListener('click', () => {
        displayTiming('Loading JSON data');
        fetchData('https://jsonplaceholder.typicode.com/posts/1');
    });

    document.getElementById('loadImage')?.addEventListener('click', () => {
        displayTiming('Loading image');
        loadImage('https://picsum.photos/800/400');
    });

    document.getElementById('loadMultipleResources')?.addEventListener('click', () => {
        displayTiming('Loading multiple resources');
        loadMultipleResources();
    });

    document.getElementById('createNetworkBottleneck')?.addEventListener('click', () => {
        displayTiming('Creating network bottleneck');
        createNetworkBottleneck();
    });

    // Fetch data with timing measurement
    function fetchData(url) {
        const startTime = performance.now();
        const dataDiv = document.getElementById('data');

        if (dataDiv) {
            dataDiv.innerHTML = 'Loading...';
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const totalTime = performance.now() - startTime;
                updateTiming(`Request completed in ${totalTime.toFixed(2)} ms`);

                if (dataDiv) {
                    dataDiv.innerHTML = JSON.stringify(data, null, 2);
                }
            })
            .catch(error => {
                if (dataDiv) {
                    dataDiv.innerHTML = `Error: ${error.message}`;
                }
                updateTiming(`Request failed: ${error.message}`);
            });
    }

    // Load and display an image
    function loadImage(url) {
        const startTime = performance.now();
        const imageContainer = document.getElementById('imageContainer');

        if (imageContainer) {
            imageContainer.innerHTML = 'Loading image...';

            const img = new Image();
            img.onload = function () {
                const loadTime = performance.now() - startTime;
                updateTiming(`Image loaded in ${loadTime.toFixed(2)} ms`);
                imageContainer.innerHTML = '';
                imageContainer.appendChild(img);
            };

            img.onerror = function () {
                imageContainer.innerHTML = 'Error loading image';
                updateTiming('Image loading failed');
            };

            img.src = url;
        }
    }

    // Load multiple resources
    function loadMultipleResources() {
        const startTime = performance.now();
        updateTiming('Loading multiple resources...');

        // Load several resources in parallel
        Promise.all([
            fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json()),
            loadImagePromise('https://picsum.photos/200/200'),
            fetch('https://jsonplaceholder.typicode.com/comments?postId=1').then(r => r.json()),
        ])
            .then(() => {
                const totalTime = performance.now() - startTime;
                updateTiming(`All resources loaded in ${totalTime.toFixed(2)} ms`);
                document.getElementById('data').innerHTML = 'Multiple resources loaded successfully';
            })
            .catch(error => {
                updateTiming(`Error: ${error.message}`);
            });
    }

    // Create a network bottleneck scenario
    function createNetworkBottleneck() {
        const startTime = performance.now();
        updateTiming('Creating network bottleneck...');

        // Sequential network requests (waterfall)
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => response.json())
            .then(data => {
                updateTiming('First request complete');
                return fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}/comments`);
            })
            .then(response => response.json())
            .then(comments => {
                updateTiming('Second request complete');
                return fetch('https://jsonplaceholder.typicode.com/users/1');
            })
            .then(response => response.json())
            .then(user => {
                const totalTime = performance.now() - startTime;
                updateTiming(`Bottleneck test completed in ${totalTime.toFixed(2)} ms`);
                document.getElementById('data').innerHTML = 'Network bottleneck scenario completed';
            })
            .catch(error => {
                updateTiming(`Error: ${error.message}`);
            });
    }

    // Helper function to load an image and return a promise
    function loadImagePromise(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
            img.src = url;
        });
    }

    // Display timing information
    function displayTiming(operationType) {
        const networkInfo = document.getElementById('networkInfo');
        if (networkInfo) {
            networkInfo.innerHTML = `<strong>${operationType} - Started at ${new Date().toLocaleTimeString()}</strong>`;
        }
    }

    // Update timing information
    function updateTiming(message) {
        const networkInfo = document.getElementById('networkInfo');
        if (networkInfo) {
            networkInfo.innerHTML += `<br>${message}`;
        }
    }
});