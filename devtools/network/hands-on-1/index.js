// took from here: http://endless.horse/

document.addEventListener('DOMContentLoaded', function () {

    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
            appendLegs();


        }
    });

    for (let i = 0; i < 5; i++) {
        appendLegs();
    }
});

function appendLegs() {
    fetch('legs.html')
        .then(response => response.text())
        .then(data => {
            const horseDiv = document.getElementById('horse');
            const newContent = document.createElement('div');
            newContent.className = 'legs';
            newContent.innerHTML = data;
            horseDiv.appendChild(newContent);
        })
        .catch(error => console.error('Error fetching legs.html:', error));
}