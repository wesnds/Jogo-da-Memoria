const cards = document.querySelectorAll('.card');
let flippedCard = false;
let card1, card2;
let lockBoard = false;


function flipCard() {
    if(lockBoard) return;
    
    if(this === card1) return;

    this.classList.add('flip');
    //this é o card que foi clicado
    if (!flippedCard) {
        flippedCard = true;
        card1 = this;
        return;
    }
    card2 = this;
    flippedCard = false; //resetando o valor
    checkForMatch();
}

cards.forEach(card => card.addEventListener('click', flipCard));

function checkForMatch() {
    if (card1.dataset.card === card2.dataset.card) {
        disableCard();
        return;
    }
/*  card1.classList.toggle('flip');
    card2.classList.toggle('flip');
    flippedCard = false;
*/
    unflipCard();
}

//caso seja igual
function disableCard() {
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);
/*  card1.classList.add('disabled');
    card2.classList.add('disabled');
*/
    resetBoard();
}

//caso nao seja igual
function unflipCard() {
    lockBoard = true;
    setTimeout(() => {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        //flippedCard = false;
        //lockBoard = false;

        resetBoard();
    }, 1000);
}

function resetBoard () {
    //desestrutura array
    [flippedCard, lockBoard] = [false, false];
    [card1, card2] = [null, null];
}

//IIFE que mexe com a propriedade order
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

