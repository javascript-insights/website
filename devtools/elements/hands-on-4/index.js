function displayCards() {
    const cardContainer0 = document.getElementById('cardContainer0');
    cardContainer0.innerHTML = Array.from({ length: 13 }, (_, index) => index).map((_,index) => `<div class="card card-0-${index}"></div>`).join('');
    
    const cardContainer1 = document.getElementById('cardContainer1');
    cardContainer1.innerHTML = Array.from({ length: 13 }, (_, index) => index).map((_,index) => `<div class="card card-1-${index}"></div>`).join('');
    
    const cardContainer2 = document.getElementById('cardContainer2');
    cardContainer2.innerHTML = Array.from({ length: 13 }, (_, index) => index).map((_,index) => `<div class="card card-2-${index}"></div>`).join('');

    const cardContainer3 = document.getElementById('cardContainer3');
    cardContainer3.innerHTML = Array.from({ length: 13 }, (_, index) => index).map((_,index) => `<div class="card card-3-${index}"></div>`).join('');
}

// Display initial set of random cards on page load
window.onload = () => {
    displayCards();
};
