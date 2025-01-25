document.addEventListener('DOMContentLoaded', () => {

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

