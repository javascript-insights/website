document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('showBoxModel').addEventListener('click', function () {
        const image = document.getElementById('boxModelImage');
        image.style.display = image.style.display === 'none' ? 'block' : 'none';
    });
});