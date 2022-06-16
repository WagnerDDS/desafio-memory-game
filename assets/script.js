const players = document.getElementsByClassName("player");
let scoreText = document.getElementById("score");
let activePlayer = 0;
let scores = [0, 0];

function changePlayer() {
  if (players[0].classList.contains("playerActive")) {
    setTimeout(() => {
      players[0].classList.remove("playerActive");
      players[1].classList.add("playerActive");
      players[0].innerHTML = "Player 1";
      players[1].innerHTML = "&#127918 Player 2 ";
      activePlayer = 1;
    }, 1500);
  } else {
    setTimeout(() => {
      players[0].classList.add("playerActive");
      players[1].classList.remove("playerActive");
      players[0].innerHTML = "&#127918 Player 1 ";
      players[1].innerHTML = "Player 2 ";
      activePlayer = 0;
    }, 1500);
  }
}
changePlayer();

const cards = document.querySelectorAll(".card");

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
  if (!lockBoard) {
    this.classList.add("flip");
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }
    secondCard = this;
    checkForMatch();
    hasFlippedCard = false;
  }
}

function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    console.log("deu match");
    scores[activePlayer]++;
    scoreText.innerHTML = scores[0] + " x " + scores[1];
    changePlayer();
    return;
  }
  unflipCards();
  changePlayer();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
})();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
