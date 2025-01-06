document.addEventListener('DOMContentLoaded', () => {
    const heroImage = document.querySelector('.hero-image');
    setTimeout(() => {
        heroImage.style.backgroundImage = "url('optimized-image.png')";
    }, 3000); // Simulate delayed loading

    // Measure LCP
    new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime, entry);
            }
        }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
});