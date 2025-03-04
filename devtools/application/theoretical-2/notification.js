window.addEventListener("load", function () {

    // notification
    ///////////////////////////////////////////////////////////////////////////
    document.getElementById('notifyButton').addEventListener('click', async () => {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                document.getElementById('notifyButton').disabled = true;
                document.getElementById('sendNotification').disabled = false;
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    });

    document.getElementById('sendNotification').addEventListener('click', () => {
        try {
            new Notification('Test Notification', {
                body: 'This is a test notification from the PWA',
                icon: '/static/favicon.png'
            });
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    });
});
