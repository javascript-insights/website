// File: /push-messaging-demo/push-messaging-demo/client/app.js

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('push-messaging-service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
            initializePushMessaging(registration);
        })
        .catch(err => console.error('Service Worker registration failed:', err));
}

async function initializePushMessaging(registration) {
    const subscribeButton = document.getElementById('subscribe');
    const notificationButton = document.getElementById('sendNotification');

    subscribeButton.addEventListener('click', async () => {
        try {
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlB64ToUint8Array('BDd3_hVL9fZi9Ybo2UUzA284WG5FZR30_95YeZJsiApwXKpNcF1rRPF3foIiBHXRdJI2Qhumhf6_LFTeZaNndIo')
            });
            console.log('Push subscription:', subscription);
            // Send subscription to the server
            await fetch('/subscribe', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Push subscription failed:', error);
        }
    });

    notificationButton.addEventListener('click', async () => {
        await fetch('/send-notification', {
            method: 'POST'
        });
    });
}

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}