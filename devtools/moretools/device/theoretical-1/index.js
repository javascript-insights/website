document.addEventListener('DOMContentLoaded', () => {
    console.log('🔍 Device Mode Demo - Ready to explore!');
    
    // Theme toggle functionality
    const themeButton = document.getElementById('changeTheme');
    if (themeButton) {
        themeButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            console.log('Theme toggled. Check how your design system handles theme changes!');
        });
    }
    
    // Touch event simulation
    const touchButton = document.getElementById('simulateTouch');
    const touchResult = document.getElementById('touchResult');
    
    if (touchButton && touchResult) {
        touchButton.addEventListener('click', () => {
            // Clear previous results
            touchResult.innerHTML = '';
            
            // Display device info
            const deviceInfo = document.createElement('div');
            deviceInfo.innerHTML = `
                <h4>Your Device Information:</h4>
                <p>🖥️ Screen: ${window.screen.width}x${window.screen.height}</p>
                <p>📱 Viewport: ${window.innerWidth}x${window.innerHeight}</p>
                <p>📊 Device Pixel Ratio: ${window.devicePixelRatio}</p>
                <p>👆 Touch Enabled: ${('ontouchstart' in window) ? 'Yes' : 'No'}</p>
                <p>🎯 Pointer Type: ${getPointerType()}</p>
            `;
            touchResult.appendChild(deviceInfo);
            
            // Create a visual representation of touch vs. mouse interaction
            const interactionDemo = document.createElement('div');
            interactionDemo.style.height = '100px';
            interactionDemo.style.backgroundColor = '#e0e0e0';
            interactionDemo.style.marginTop = '10px';
            interactionDemo.style.display = 'flex';
            interactionDemo.style.justifyContent = 'center';
            interactionDemo.style.alignItems = 'center';
            interactionDemo.style.borderRadius = '8px';
            interactionDemo.style.cursor = 'pointer';
            interactionDemo.textContent = 'Interact with me! (click or touch)';
            
            // Add event listeners to demonstrate different interaction methods
            interactionDemo.addEventListener('mousedown', (e) => {
                interactionDemo.style.backgroundColor = '#4285f4';
                interactionDemo.textContent = `Mouse Event at ${e.clientX}, ${e.clientY}`;
            });
            
            interactionDemo.addEventListener('touchstart', (e) => {
                e.preventDefault();
                interactionDemo.style.backgroundColor = '#34a853';
                const touch = e.touches[0];
                interactionDemo.textContent = `Touch Event at ${touch.clientX}, ${touch.clientY}`;
            });
            
            touchResult.appendChild(interactionDemo);
            
            // Add instructional note
            const note = document.createElement('p');
            note.innerHTML = '<strong>Note:</strong> In Device Mode, you can simulate touch events even on desktop. Try toggling the touch simulation option in DevTools!';
            note.style.marginTop = '10px';
            note.style.fontSize = '0.9em';
            note.style.fontStyle = 'italic';
            touchResult.appendChild(note);
            
            // Log information to console for DevTools exploration
            console.log('📱 Device Information:', {
                screen: `${window.screen.width}x${window.screen.height}`,
                viewport: `${window.innerWidth}x${window.innerHeight}`,
                devicePixelRatio: window.devicePixelRatio,
                touchEnabled: 'ontouchstart' in window,
                pointerType: getPointerType()
            });
        });
    }
    
    // Helper function to determine pointer type
    function getPointerType() {
        if (!window.matchMedia) return 'Unknown';
        
        if (window.matchMedia('(pointer: coarse)').matches) {
            return 'Coarse (typically touch)';
        } else if (window.matchMedia('(pointer: fine)').matches) {
            return 'Fine (typically mouse)';
        } else {
            return 'None/Unknown';
        }
    }
    
    // Log responsive design information on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            console.log('📏 Viewport Resized:', {
                width: window.innerWidth,
                height: window.innerHeight,
                orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
            });
            
            // Log current media query matches
            const mediaQueries = [
                { name: 'Mobile', query: '(max-width: 767px)' },
                { name: 'Tablet', query: '(min-width: 768px) and (max-width: 1023px)' },
                { name: 'Desktop', query: '(min-width: 1024px)' }
            ];
            
            console.log('🎯 Current breakpoint:', mediaQueries.find(
                mq => window.matchMedia(mq.query).matches
            )?.name || 'Unknown');
        }, 250);
    });
    
    // Add educational DevTools console messages
    console.log('%c📱 Device Tool Demo Page', 'font-size: 16px; font-weight: bold; color: #4285f4;');
    console.log('%c👉 Quick Tips:', 'font-weight: bold; color: #34a853;');
    console.log('%c1. Toggle Device Mode with Ctrl+Shift+M (Windows/Linux) or Cmd+Shift+M (Mac)', 'color: #000;');
    console.log('%c2. Try different devices from the dropdown menu in Device Mode', 'color: #000;');
    console.log('%c3. Rotate the device using the rotation button', 'color: #000;');
    console.log('%c4. Test throttling by selecting network conditions', 'color: #000;');
    console.log('%c5. Check device-specific media queries in the CSS panel', 'color: #000;');
});