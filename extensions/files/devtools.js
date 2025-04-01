// Create a DevTools panel
chrome.devtools.panels.create(
    "JS Insights", // Panel title
    "icon.png",    // Panel icon
    "panel.html",  // Panel page
    function (panel) {
        console.log("DevTools panel created");

        // You can handle panel events here
        panel.onShown.addListener(function (window) {
            console.log("Panel window shown");
        });

        panel.onHidden.addListener(function () {
            console.log("Panel window hidden");
        });
    }
);
