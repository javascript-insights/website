window.addEventListener("load", function () {
    // Reference Error Example
    document.getElementById('button1').addEventListener('click', function() {
        try {
            console.log(undefinedVariable);
        } catch (e) {
            console.error('Can you spot the ReferenceError?', e);
        }
    });

    // Type Error Example
    document.getElementById('button2').addEventListener('click', function() {
        try {
            const number = 42;
            number.toLowerCase();
        } catch (e) {
            console.error('Can you spot the TypeError?', e);
        }
    });

    // Syntax Error Example
    document.getElementById('button3').addEventListener('click', function() {
        try {
            eval('if (true) { console.log("Hello" };'); // Missing parenthesis
        } catch (e) {
            console.error('Can you spot the SyntaxError?', e);
        }
    });

    // Range Error Example
    document.getElementById('button4').addEventListener('click', function() {
        try {
            const arr = new Array(-1); // Invalid array length
        } catch (e) {
            console.error('Can you spot the RangeError?', e);
        }
    });

    // URI Error Example
    document.getElementById('button5').addEventListener('click', function() {
        try {
            decodeURIComponent('%'); // Invalid URI encoding
        } catch (e) {
            console.error('Can you spot the URIError?', e);
        }
    });

    // Network Error Example
    document.getElementById('button6').addEventListener('click', function() {
        fetch('https://nonexistent-domain-123456.com')
            .then(response => response.json())
            .catch(e => console.error('Can you spot the NetworkError?', e));
    });

    // DOM Exception Example
    document.getElementById('button7').addEventListener('click', function() {
        try {
            document.createElement('::::'); // Invalid element name
        } catch (e) {
            console.error('Can you spot the DOMException?', e);
        }
    });

    // JSON Parse Error Example
    document.getElementById('button8').addEventListener('click', function() {
        try {
            JSON.parse('{invalid json}');
        } catch (e) {
            console.error('Can you spot the JSON Parse Error?', e);
        }
    });

    // Promise Error Example
    document.getElementById('button9').addEventListener('click', function() {
        new Promise((resolve, reject) => {
            throw new Error('Promise rejected');
        }).catch(e => console.error('Can you spot the Promise Error?', e));
    });

    // Console Warning
    console.warn('This is a warning message');

    // Console Info
    console.info('This is an info message');

    // Console Debug
    console.debug('This is a debug message');

    // Console Trace
    console.trace('This is a stack trace');
});