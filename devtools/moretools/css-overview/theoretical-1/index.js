document.addEventListener('DOMContentLoaded', () => {
    // Example script to update score
    let score = 0;
    function updateScore(points) {
        score += points;
        document.getElementById('score').innerText = score;
    }
});
