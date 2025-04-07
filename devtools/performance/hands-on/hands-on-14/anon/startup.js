window.addEventListener("load", function () {
    console.log('startup.js loaded');
    var maxDepth = 3; // Reduced depth for more focused context

    // Main click event handler
    document.addEventListener('click', function CollectContext(event) {
        let element = event.target;
        let contextData = {};

        // Collect data from the clicked element itself
        collectElementData(element, contextData, "clicked");

        // Collect context from different directions
        collectParentContext(element, contextData);
        collectSiblingContext(element, contextData);
        collectChildrenContext(element, contextData);

        console.log("Context data collected:", contextData);
    });

    // Collect data from parent elements
    function collectParentContext(element, contextData) {
        let depth = 0;
        let parentElement = element.parentElement;
        while (parentElement && depth < maxDepth) {
            collectElementData(parentElement, contextData, "parent_" + depth);
            parentElement = parentElement.parentElement;
            depth++;
        }
    }

    // Collect data from sibling elements
    function collectSiblingContext(element, contextData) {
        if (!element.parentElement) return;

        let siblings = element.parentElement.children;
        for (let i = 0; i < siblings.length; i++) {
            if (siblings[i] !== element) {
                collectElementData(siblings[i], contextData, "sibling_" + i);
            }
        }
    }

    // Collect data from children elements
    function collectChildrenContext(element, contextData) {
        if (element.parentElement) {
            traverseDown(element.parentElement, 0, "nearby", contextData, element);
        }
    }

    // Helper function to traverse down the DOM tree
    function traverseDown(element, depth, path, contextData, originalElement) {
        if (!element || depth >= maxDepth) return;

        let children = element.children;
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            // Skip the original clicked element to avoid duplication
            if (child !== originalElement) {
                collectElementData(child, contextData, path + "_child_" + i);
                traverseDown(child, depth + 1, path + "_child_" + i, contextData, originalElement);
            }
        }
    }

    function collectElementData(element, contextData, path) {
        if (!element) return;

        // Heavy calculation - compute style properties
        const computedStyle = window.getComputedStyle(element);
        let styleProperties = {};
        for (let i = 0; i < computedStyle.length; i++) {
            const prop = computedStyle[i];
            styleProperties[prop] = computedStyle.getPropertyValue(prop);
        }

        // Expensive DOM operations
        const boundingRect = element.getBoundingClientRect();
        const visibleArea = Math.round(boundingRect.width * boundingRect.height);

        // Intensive string operations
        const fullHTML = element.outerHTML;
        const wordCount = element.textContent?.split(/\s+/).filter(Boolean).length || 0;

        // Expensive calculations to simulate load
        let hash = 0;
        const text = element.textContent || '';
        for (let i = 0; i < text.length; i++) {
            hash = ((hash << 5) - hash) + text.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }

        let data = {
            tagName: element.tagName,
            text: element.textContent?.trim(),
            id: element.id || null,
            className: element.className || null,
            styleProperties: styleProperties,
            dimensions: {
                width: boundingRect.width,
                height: boundingRect.height,
                top: boundingRect.top,
                left: boundingRect.left,
                visibleArea: visibleArea
            },
            htmlLength: fullHTML.length,
            wordCount: wordCount,
            contentHash: hash
        };

        // Collect specific attributes - with additional processing
        if (element.hasAttribute('data-price')) {
            const price = element.getAttribute('data-price');
            data.price = price;
            data.priceNumeric = parseFloat(price.replace(/[^\d.-]/g, ''));
        }

        if (element.hasAttribute('data-product-name')) {
            data.productName = element.getAttribute('data-product-name');
        }

        // For images, collect and process src and alt text
        if (element.tagName === 'IMG') {
            data.src = element.src;
            data.alt = element.alt;
            data.isLoaded = element.complete && element.naturalHeight !== 0;
        }

        contextData[path] = data;
    }
});