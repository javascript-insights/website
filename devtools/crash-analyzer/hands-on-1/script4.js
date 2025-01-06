document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('changeColorButton').addEventListener('click', () => {
        const colorDiv = document.getElementById('colorDiv');
        colorDiv.style.backgroundColor = colorDiv.style.backgroundColor === 'yellow' ? 'lightblue' : 'yellow';
    });
});