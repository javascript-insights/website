document.addEventListener('DOMContentLoaded', () => {
    if ('IdleDetector' in window) {
        navigator.permissions.query({ name: 'idle-detection' }).then(permissionStatus => {
            if (permissionStatus.state === 'granted') {
                const idleDetector = new IdleDetector();
                idleDetector.addEventListener('change', () => {
                    const userState = idleDetector.userState;
                    const screenState = idleDetector.screenState;
                    document.getElementById('idle-state-message').innerText = `Idle state: ${userState}, Screen state: ${screenState}`;
                });
                idleDetector.start({ threshold: 60000 }).catch(err => {
                    document.getElementById('idle-state-message').innerText = `Idle Detector error: ${err.message}`;
                });
            } else {
                document.getElementById('idle-state-message').innerText = 'Idle Detector permission not granted.';
            }
        }).catch(err => {
            document.getElementById('idle-state-message').innerText = `Permission query error: ${err.message}`;
        });
    } else {
        document.getElementById('idle-state-message').innerText = 'Idle Detector API not supported in this browser.';
    }
});

function getLocation() {
    const demo = document.getElementById("demo");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        demo.innerHTML = "Geolocation is not supported by this browser.";
    }

}

function showPosition(position) {
    const demo = document.getElementById("demo");
    demo.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;

    const src = `https://maps.google.com/maps?hl=en&q=${position.coords.latitude},${position.coords.longitude}&output=embed`;
    const demoIframe = document.getElementById("demoIframe");
    demoIframe.src = src;


}

