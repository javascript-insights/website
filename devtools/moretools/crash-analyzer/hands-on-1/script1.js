document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is loaded and running.');

    document.getElementById('clickButton').addEventListener('click', () => {
        alert('Button clicked!');
    });

    document.getElementById('hoverButton').addEventListener('mouseover', () => {
        console.log('Button hovered!');
    });
});