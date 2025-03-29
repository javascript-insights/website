document.addEventListener('DOMContentLoaded', () => {
    // Paint flashing demo
    const paintDemo = document.querySelector('.paint-demo');
    if (paintDemo) {
        paintDemo.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

    // Layout shift demo
    const layoutButton = document.querySelector('.trigger-button');
    const layoutDemo = document.querySelector('.layout-demo');
    if (layoutButton && layoutDemo) {
        layoutButton.addEventListener('click', function () {
            layoutDemo.classList.toggle('expanded');
        });
    }

    // Animation demo for FPS meter
    const animBox = document.getElementById('animation-box');
    if (animBox) {
        animBox.addEventListener('mouseenter', function () {
            this.classList.add('animated');
        });
        animBox.addEventListener('mouseleave', function () {
            this.classList.remove('animated');
        });
    }

    // Scrolling performance issue demo
    const stickyElem = document.querySelector('.sticky-elem');
    if (stickyElem) {
        stickyElem.textContent = "I'm sticky! Scroll to see";
    }

    // Slow element demo
    const slowElement = document.querySelector('.slow-element');
    if (slowElement) {
        slowElement.addEventListener('click', function () {
            this.classList.toggle('active');
            // Force layout thrashing with getBoundingClientRect()
            if (this.classList.contains('active')) {
                for (let i = 0; i < 100; i++) {
                    this.getBoundingClientRect();
                    this.style.margin = (i % 2) + 'px';
                }
            }
        });
    }

    // Expensive paint operation demo
    const expensivePaintButton = document.getElementById('expensive-paint-button');
    const expensivePaintDemo = document.querySelector('.expensive-paint-demo');
    if (expensivePaintButton && expensivePaintDemo) {
        expensivePaintButton.addEventListener('click', function () {
            // Create many elements quickly to cause expensive paint
            expensivePaintDemo.innerHTML = '';
            for (let i = 0; i < 500; i++) {
                const div = document.createElement('div');
                div.className = 'mini-box';
                div.style.width = '5px';
                div.style.height = '5px';
                div.style.position = 'absolute';
                div.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
                div.style.left = `${Math.random() * 100}%`;
                div.style.top = `${Math.random() * 100}%`;
                expensivePaintDemo.appendChild(div);
            }
        });
    }

    // Handle Container Query Demo resizing
    const containerDemo = document.querySelector('.container-demo');
    if (containerDemo) {
        const containerInfo = document.createElement('div');
        containerInfo.className = 'container-info';
        containerInfo.style.fontSize = '0.8em';
        containerInfo.style.marginTop = '5px';
        containerDemo.appendChild(containerInfo);

        // Update container width information
        const updateContainerInfo = () => {
            const width = containerDemo.clientWidth;
            containerInfo.textContent = `Current width: ${width}px`;
            if (width >= 400) {
                containerInfo.textContent += ' (flex layout active)';
            } else {
                containerInfo.textContent += ' (block layout active)';
            }
        };

        // Set up a ResizeObserver to monitor container width changes
        const resizeObserver = new ResizeObserver(entries => {
            updateContainerInfo();
        });
        resizeObserver.observe(containerDemo);
        updateContainerInfo(); // Initial update
    }

    // Toggle between show/hide grid overlay in the CSS Grid demo
    const gridToggleBtn = document.getElementById('toggle-grid-overlay');
    if (gridToggleBtn) {
        gridToggleBtn.addEventListener('click', () => {
            alert('To see grid overlay: In DevTools Rendering panel, enable "Show layout shift regions"');
        });
    }

    // Enable contrast issues demonstration
    const contrastToggle = document.getElementById('toggle-contrast');
    const lowContrastText = document.querySelector('.low-contrast');
    if (contrastToggle && lowContrastText) {
        contrastToggle.addEventListener('click', () => {
            lowContrastText.style.color = lowContrastText.style.color === 'black'
                ? '#aaaaaa'
                : 'black';
        });
    }
});