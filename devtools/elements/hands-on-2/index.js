document.addEventListener('DOMContentLoaded', () => {

    const gameBoard = document.getElementById('game-board');
    const matchesDisplay = document.getElementById('matches');
    const missesDisplay = document.getElementById('misses');
    let matches = 0;
    let misses = 0;
    let firstCard, secondCard;
    let lockBoard = false;

    const cards = [
        'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
        'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
    ];

    // Shuffle cards randomly
    function shuffleCards() {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }

    function createCards() {
        shuffleCards();
        cards.forEach((letter) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.textContent = letter;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }

    function checkForMatch() {
        if (firstCard.textContent === secondCard.textContent) {
            disableCards();
            matches++;
            matchesDisplay.textContent = matches;
        } else {
            unflipCards();
            misses++;
            missesDisplay.textContent = misses;
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard] = [];
        lockBoard = false;
    }

    createCards();

});
