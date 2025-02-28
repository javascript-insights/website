// Function to simulate image optimization
function optimizeImage() {
    const img = document.getElementById('unoptimized-image');
    // Simulate switching to an optimized version
    img.src = 'optimized-cat.jpg';
    alert('Image optimized! (In a real scenario, this would use a properly compressed image)');
}

// Function to fix font loading
function fixFontLoading() {
    const fancyText = document.querySelector('.fancy-text');
    // Add font-display: swap to improve font loading
    fancyText.style.fontDisplay = 'swap';
    alert('Font loading optimized with font-display: swap');
}

// Variables for animation
let animationFrameId;
let position = 0;

// Function to start a deliberately laggy animation
function startHeavyAnimation() {
    const element = document.getElementById('heavy-animation');
    
    function animate() {
        position = (position + 1) % window.innerWidth;
        // Intentionally inefficient animation
        element.style.transform = `translateX(${position}px)`;
        // Force layout recalculation (bad practice - for demo purposes)
        element.offsetHeight;
        animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
}

// Function to fix the animation
function fixAnimation() {
    // Cancel the laggy animation
    cancelAnimationFrame(animationFrameId);
    
    const element = document.getElementById('heavy-animation');
    // Use CSS transform for smooth animation
    element.style.transition = 'transform 2s linear';
    element.style.transform = 'translateX(100%)';
    alert('Animation optimized using CSS transforms!');
}

// Function to fix accessibility issues
function fixAccessibility() {
    const badContrast = document.getElementById('bad-contrast');
    // Improve contrast
    badContrast.style.backgroundColor = '#000000';
    badContrast.style.color = '#ffffff';
    // Add proper focus styles
    badContrast.style.padding = '10px';
    badContrast.style.cursor = 'pointer';
    badContrast.setAttribute('tabindex', '0');
    alert('Accessibility improved with better contrast and focus handling!');
}

// Function to fix SEO issues
function fixSEO() {
    const seoSection = document.getElementById('seo-nightmare');
    const img = seoSection.querySelector('img');
    const link = seoSection.querySelector('div');
    
    // Add alt text to image
    img.alt = 'Funny cat meme';
    
    // Convert div to semantic link
    const newLink = document.createElement('a');
    newLink.href = '#';
    newLink.textContent = 'Click here for more cat memes';
    link.parentNode.replaceChild(newLink, link);
    
    alert('SEO improved with proper alt text and semantic HTML!');
}