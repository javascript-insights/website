document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendMessage');
    const resultText = document.getElementById('main-frame-result-text');
    const iframe = document.querySelector('iframe');
    let messageCount = 0;

    // Send message to iframe
    sendButton.addEventListener('click', () => {
        // Create some artificial work for the performance trace to detect
        let result = 0;
        for (let i = 0; i < 5000; i++) {
            result += Math.sin(i * 0.01);
        }

        // Send message to iframe with a small delay
        setTimeout(() => {
            if (iframe.contentWindow) {
                iframe.contentWindow.postMessage('my-message-1', '*');
                console.log('Message sent to iframe');
            }
        }, 50);
    });

    // Listen for messages from iframe
    window.addEventListener('message', (event) => {
        if (event.data === 'my-message-2') {
            // Create a small processing delay to show in the trace
            setTimeout(() => {
                messageCount++;
                resultText.textContent = `Received ${messageCount} messages`;
                console.log('Message received from iframe');
            }, 20);
        }
    }, false);

    // Helpful console message
    console.log('Performance tracking demo loaded. Open DevTools to begin recording.');
});
