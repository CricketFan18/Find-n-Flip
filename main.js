const cards = document.querySelectorAll(".card");
const items = ["Captain America", "Daredevil", "Iron Man", "Spider-Man", "Deadpool", "Wolverine", "Hulk", "Thor", "Ant-Man", "Dr Strange", "Black Panther", "Thanos"];
const pairs = items.flatMap(card => [card, card]);
const pointsEl = document.getElementById("points");
const movesEl = document.getElementById("moves");
const rightSound = new Audio("assets/correct.mp3");
const wrongSound = new Audio("assets/wrong.mp3");
const flipSound = new Audio("assets/cardflip.mp3");
const winSound = new Audio("assets/success.mp3");
let points = 0;
let totalMoves = 0;
let move = 0;
let cardsClicked = [];
const maxMove = 2;
let _0x1a2b3c = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const k = Math.floor(Math.random() * (i + 1));
        [array[i], array[k]] = [array[k], array[i]];
    }
    return array;
}

function GameInit() {
    _0x1a2b3c = shuffleArray(pairs);
    cards.forEach(card => {
        card.innerHTML = `<p></p>`;
    });
}

function CardClicked(card, index) {
    if (cardsClicked.includes(card) || card.classList.contains("flip")) {
        return;
    }
    totalMoves++;
    movesEl.textContent = `Moves : ${totalMoves}`;
    if (move < maxMove) {
        card.classList.add("flip");
        setTimeout(() => {
            flipSound.play();
            card.firstElementChild.textContent = _0x1a2b3c[index];
        }, 200);
        cardsClicked.push(card);
        move++;
    }
    if (move === 2) {
        document.body.style.pointerEvents = "none";
        const [card1, card2] = cardsClicked;
        const value1 = _0x1a2b3c[Array.from(cards).indexOf(card1)];
        const value2 = _0x1a2b3c[Array.from(cards).indexOf(card2)];

        if (value1 === value2) {
            points++;
            if (points <= 11) {
                rightSound.play();
            }
            pointsEl.textContent = `Points : ${points}`;
            setTimeout(() => {
                resetState();
            }, 1000);
            if (points === 12) {
                winSound.play();
            }
        } else {
            wrongSound.play();
            setTimeout(() => {
                cardsClicked.forEach(cardClicked => {
                    cardClicked.classList.remove("flip");
                    setTimeout(() => {
                        cardClicked.firstElementChild.textContent = "";
                    }, 100);
                });
                resetState();
            }, 1000);
        }
    }
}

function resetState() {
    cardsClicked = [];
    move = 0;
    document.body.style.pointerEvents = "auto";
}

cards.forEach((card, index) => {
    card.addEventListener("click", () => {
        CardClicked(card, index);
    });
});

GameInit();
