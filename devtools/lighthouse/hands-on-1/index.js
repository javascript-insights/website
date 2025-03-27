document.addEventListener('DOMContentLoaded', () => {
    // Performance test elements
    const loadLargeImage = document.getElementById('load-large-image');
    const loadRenderBlocking = document.getElementById('load-render-blocking');
    const resetPerformance = document.getElementById('reset-performance');
    const performanceSandbox = document.getElementById('performance-sandbox');

    // Accessibility test elements
    const addLowContrast = document.getElementById('add-low-contrast');
    const addMissingLabels = document.getElementById('add-missing-labels');
    const addMissingAlt = document.getElementById('add-missing-alt');
    const resetAccessibility = document.getElementById('reset-accessibility');
    const accessibilitySandbox = document.getElementById('accessibility-sandbox');

    // Best practices test elements
    const addConsoleErrors = document.getElementById('add-console-errors');
    const addHttpResource = document.getElementById('add-http-resource');
    const resetBestPractices = document.getElementById('reset-best-practices');
    const bestPracticesSandbox = document.getElementById('best-practices-sandbox');

    // SEO test elements
    const addSmallText = document.getElementById('add-small-text');
    const removeMetaTags = document.getElementById('remove-meta-tags');
    const resetSeo = document.getElementById('reset-seo');
    const seoSandbox = document.getElementById('seo-sandbox');

    // Performance tests
    loadLargeImage.addEventListener('click', () => {
        performanceSandbox.innerHTML = `
            <p>This is an unoptimized image (5MB+) that will affect your performance score:</p>
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Pizigani_1367_Chart_10MB.jpg" 
                 width="100%" style="max-width: 800px">
            <p>Lighthouse will flag this as "Properly size images" and "Efficiently encode images".</p>
        `;
    });

    loadRenderBlocking.addEventListener('click', () => {
        const script = document.createElement('script');
        script.id = 'render-blocking-script';
        script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        document.head.appendChild(script);
        
        performanceSandbox.innerHTML += `
            <p>Added render-blocking resource: jQuery library.</p>
            <p>Lighthouse will flag this as "Eliminate render-blocking resources".</p>
        `;
    });

    resetPerformance.addEventListener('click', () => {
        performanceSandbox.innerHTML = '<p>Performance test area - click buttons above to load test elements</p>';
        const script = document.getElementById('render-blocking-script');
        if (script) script.remove();
    });

    // Accessibility tests
    addLowContrast.addEventListener('click', () => {
        accessibilitySandbox.innerHTML += `
            <p style="color: #aaa; background-color: #eee;">
                This text has very low contrast and would be difficult for some users to read.
                Lighthouse will flag this as "Background and foreground colors do not have a sufficient contrast ratio".
            </p>
        `;
    });

    addMissingLabels.addEventListener('click', () => {
        accessibilitySandbox.innerHTML += `
            <div>
                <input type="text" placeholder="Name (missing label)">
                <input type="email" placeholder="Email (missing label)">
                <p>Lighthouse will flag these as "Form elements do not have associated labels".</p>
            </div>
        `;
    });

    addMissingAlt.addEventListener('click', () => {
        accessibilitySandbox.innerHTML += `
            <div>
                <img src="https://placehold.co/300x200/blue/white?text=No+Alt+Text" width="300" height="200">
                <p>Lighthouse will flag this as "Image elements do not have [alt] attributes".</p>
            </div>
        `;
    });

    resetAccessibility.addEventListener('click', () => {
        accessibilitySandbox.innerHTML = '<p>Accessibility test area - click buttons above to load test elements</p>';
    });

    // Best practices tests
    addConsoleErrors.addEventListener('click', () => {
        console.error("This is a deliberate error for the Lighthouse demo");
        console.error("Another deliberate error for the Lighthouse demo");
        
        bestPracticesSandbox.innerHTML += `
            <p>Console errors have been generated. Check your console.</p>
            <p>Lighthouse will flag this as "Browser errors were logged to the console".</p>
        `;
    });

    addHttpResource.addEventListener('click', () => {
        const insecureImg = document.createElement('img');
        insecureImg.src = 'http://via.placeholder.com/150';
        insecureImg.style.display = 'none';
        bestPracticesSandbox.appendChild(insecureImg);
        
        bestPracticesSandbox.innerHTML += `
            <p>Added a non-secure (HTTP) resource to this page.</p>
            <p>Lighthouse will flag this as "Includes front-end JavaScript libraries with known security vulnerabilities".</p>
        `;
    });

    resetBestPractices.addEventListener('click', () => {
        bestPracticesSandbox.innerHTML = '<p>Best practices test area - click buttons above to load test elements</p>';
    });

    // SEO tests
    addSmallText.addEventListener('click', () => {
        seoSandbox.innerHTML += `
            <p style="font-size: 9px;">
                This text is too small to be easily readable. Lighthouse will flag this as 
                "Document doesn't use legible font sizes".
            </p>
        `;
    });

    removeMetaTags.addEventListener('click', () => {
        seoSandbox.innerHTML += `
            <p>Simulating missing meta tags (this doesn't actually remove them).</p>
            <p>If meta description was really missing, Lighthouse would flag as "Document does not have a meta description".</p>
        `;
    });

    resetSeo.addEventListener('click', () => {
        seoSandbox.innerHTML = '<p>SEO test area - click buttons above to load test elements</p>';
    });
});
