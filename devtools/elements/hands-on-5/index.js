const cardImages = [
    'card-0-9',
    'card-0-10',
    'card-0-11',
    'card-0-12',
    'card-1-9',
    'card-1-10',
    'card-1-11',
    'card-1-12',
    'card-2-9',
    'card-2-10',
    'card-2-11',
    'card-2-12',
    'card-3-9',
    'card-3-10',
    'card-3-11',
    'card-3-12',
];

let initialCards = [];

function getRandomCards() {
    const shuffled = cardImages.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
}

function displayCards(cards) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = cards.map(card => `<div class="card ${card}"></div>`).join('');
}

function magicTrick() {
    let newCards;
    do {
        newCards = getRandomCards();
    } while (newCards.some(card => initialCards.includes(card)));
    displayCards(newCards);

    // Change button text to "Play Again"
    const magicButton = document.getElementById('magicButton');
    magicButton.disabled = true;
    
}

// Display initial set of random cards on page load
window.onload = () => {
    initialCards = getRandomCards();
    displayCards(initialCards);
};