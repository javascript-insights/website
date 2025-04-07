window.addEventListener("load", function () {
    // Display network information at startup
    const networkInfo = document.getElementById('networkInfo');
    if (networkInfo) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            networkInfo.innerHTML = `<strong>Current Network Info:</strong><br>
                                    Connection Type: ${connection.effectiveType || 'Unknown'}<br>
                                    Downlink: ${connection.downlink ? connection.downlink + ' Mbps' : 'Unknown'}<br>
                                    RTT: ${connection.rtt ? connection.rtt + ' ms' : 'Unknown'}`;
        } else {
            networkInfo.innerHTML = '<strong>Network Information API not available in this browser.</strong>';
        }
    }

    // Set up event listeners for all buttons
    document.getElementById('loadData')?.addEventListener('click', () => {
        displayTiming('Small JSON data');
        fetchData('https://jsonplaceholder.typicode.com/posts/1');
    });

    document.getElementById('loadLargeData')?.addEventListener('click', () => {
        displayTiming('Large JSON dataset');
        fetchData('https://jsonplaceholder.typicode.com/photos');
    });

    document.getElementById('loadImage')?.addEventListener('click', () => {
        displayTiming('Image loading');
        loadImage('https://picsum.photos/800/400');
    });

    document.getElementById('simulateSlowRequest')?.addEventListener('click', () => {
        displayTiming('Slow API response');
        fetchData('https://httpstat.us/200?sleep=2000');
    });

    document.getElementById('loadMultipleResources')?.addEventListener('click', () => {
        displayTiming('Multiple resources loading');
        loadMultipleResources();
    });

    document.getElementById('createNetworkBottleneck')?.addEventListener('click', () => {
        displayTiming('Creating network bottleneck');
        createNetworkBottleneck();
    });

    document.getElementById('checkPerformanceAnswers')?.addEventListener('click', () => {
        showPerformanceAnalysisGuide();
    });

    // Fetch data with timing measurement
    function fetchData(url) {
        const startTime = performance.now();

        // Clear previous data
        const dataDiv = document.getElementById('data');
        if (dataDiv) {
            dataDiv.innerHTML = 'Loading...';
        }

        fetch(url)
            .then(response => {
                const fetchTime = performance.now() - startTime;
                updateTiming(`Received response in ${fetchTime.toFixed(2)} ms`);

                // Check if the response is JSON
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                } else {
                    return response.text();
                }
            })
            .then(data => {
                const totalTime = performance.now() - startTime;
                updateTiming(`Total request time: ${totalTime.toFixed(2)} ms`);

                if (dataDiv) {
                    // Format the output based on the data type
                    if (typeof data === 'object') {
                        // Limit large datasets to prevent performance issues
                        let displayData = data;
                        if (Array.isArray(data) && data.length > 20) {
                            displayData = data.slice(0, 20);
                            displayData.push({ note: `... ${data.length - 20} more items not shown` });
                        }
                        dataDiv.innerHTML = JSON.stringify(displayData, null, 2);
                    } else {
                        dataDiv.innerHTML = data;
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
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

    // Load multiple resources with different priorities and patterns
    function loadMultipleResources() {
        const startTime = performance.now();
        updateTiming('Starting multiple resource loading test...');

        // Load several resources in parallel to demonstrate network contention
        Promise.all([
            // Images with different sizes
            loadImagePromise('https://picsum.photos/200/200'),
            loadImagePromise('https://picsum.photos/400/400'),
            loadImagePromise('https://picsum.photos/600/600'),

            // API calls of different sizes
            fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json()),
            fetch('https://jsonplaceholder.typicode.com/comments').then(r => r.json()),

            // Simulate a slow third-party script
            new Promise(resolve => {
                const script = document.createElement('script');
                script.src = 'https://httpstat.us/200?sleep=1000';
                script.onload = resolve;
                script.onerror = resolve; // Resolve anyway to continue the demo
                document.head.appendChild(script);
            })
        ])
            .then(() => {
                const totalTime = performance.now() - startTime;
                updateTiming(`Multiple resources loaded in ${totalTime.toFixed(2)} ms`);
                updateData('All resources have been loaded. Check the Performance panel recording to see how they interacted.');
            })
            .catch(error => {
                updateTiming(`Error loading multiple resources: ${error.message}`);
                updateData(`Error: ${error.message}`);
            });
    }

    // Create a network bottleneck scenario for performance analysis
    function createNetworkBottleneck() {
        const startTime = performance.now();
        updateTiming('Creating network bottleneck scenario...');
        updateData('Loading resources in a sub-optimal way to demonstrate performance issues...');

        // 1. Synchronous XHR - blocks the main thread
        const syncXhr = new XMLHttpRequest();
        syncXhr.open('GET', 'https://httpstat.us/200?sleep=500', false); // false = synchronous
        try {
            syncXhr.send();
            updateTiming('Completed blocking synchronous XHR');
        } catch (e) {
            updateTiming('Synchronous XHR failed or was blocked by the browser');
        }

        // 2. Waterfall dependency chain - each request waits for the previous one
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => response.json())
            .then(data => {
                updateTiming('First request complete, starting dependent request...');
                // Artificial delay with heavy computation to simulate processing
                const start = performance.now();
                while (performance.now() - start < 200) {
                    // Heavy CPU work blocking the main thread
                    Math.sqrt(Math.random() * 10000000);
                }
                return fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}/comments`);
            })
            .then(response => response.json())
            .then(comments => {
                updateTiming('Second request complete, starting final dependent request...');
                return fetch('https://jsonplaceholder.typicode.com/users/1');
            })
            .then(response => response.json())
            .then(user => {
                // Load a large image after all API calls are done
                return loadImagePromise('https://picsum.photos/1000/1000');
            })
            .then(() => {
                const totalTime = performance.now() - startTime;
                updateTiming(`Network bottleneck scenario completed in ${totalTime.toFixed(2)} ms`);
                updateData('Network bottleneck scenario complete. Review the Performance panel recording to identify issues.');
            })
            .catch(error => {
                updateTiming(`Error in network bottleneck scenario: ${error.message}`);
                updateData(`Error: ${error.message}`);
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

    // Update data container
    function updateData(message) {
        const dataDiv = document.getElementById('data');
        if (dataDiv) {
            dataDiv.innerHTML = message;
        }
    }


});