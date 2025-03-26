document.addEventListener('DOMContentLoaded', () => {
    // Update device information
    function updateDeviceInfo() {
        const viewportSizeElement = document.getElementById('viewport-size');
        const pixelRatioElement = document.getElementById('pixel-ratio');
        const userAgentElement = document.getElementById('user-agent');

        if (viewportSizeElement) {
            viewportSizeElement.textContent = `${window.innerWidth}px × ${window.innerHeight}px`;
        }

        if (pixelRatioElement) {
            pixelRatioElement.textContent = window.devicePixelRatio;
        }

        if (userAgentElement) {
            userAgentElement.textContent = navigator.userAgent;
        }
    }

    // Initial update
    updateDeviceInfo();

    // Update on resize
    window.addEventListener('resize', updateDeviceInfo);

    // Check if we're in Device Mode (not 100% reliable but can provide a hint)
    function checkDeviceMode() {
        const isInDeviceMode = window.navigator.userAgent.indexOf('Mobile') !== -1 &&
            window.outerWidth !== window.innerWidth;

        const body = document.querySelector('body');
        if (isInDeviceMode) {
            body.setAttribute('data-device-mode', 'true');
        } else {
            body.removeAttribute('data-device-mode');
        }
    }

    checkDeviceMode();
    window.addEventListener('resize', checkDeviceMode);
});