document.addEventListener('DOMContentLoaded', () => {
    const heroImage = document.querySelector('.hero-image');
    setTimeout(() => {
        heroImage.style.backgroundImage = "url('optimized-image.png')";
    }, 3000); // Simulate delayed loading
});