document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('toggleButton').addEventListener('click', () => {
        const toggleDiv = document.getElementById('toggleDiv');
        toggleDiv.style.display = toggleDiv.style.display === 'none' ? 'block' : 'none';
    });
});