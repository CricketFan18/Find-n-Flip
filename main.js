const cards = document.querySelectorAll(".card");
const items = ["Captain America","Daredevil","Iron Man","Spider-Man","Deadpool","Wolverine","Hulk","Thor","Ant-Man","Dr Strange","Black Panther","Thanos"];
const pairs = items.flatMap(card => [card, card]);
const pointsEl = document.getElementById("points");
const movesEl = document.getElementById("moves");

let points = 0;
let totalMoves = 0;
let move = 0;
let cardsClicked = [];
const maxMove = 2;

function shuffleArray(array) {
    for(let i = array.length-1 ; i > 0 ; i--) {
        const k = Math.floor(Math.random() * (i+1));
        [ array[i], array[k] ] = [ array[k], array[i] ];
    }
    return array;
}

function GameInit()
{
    const shuffledPairs = shuffleArray((pairs));
    cards.forEach((card,index) => {
        card.innerHTML = `<p>${shuffledPairs[index]}</p>`
    });  
}

function CardClicked(card){
    if (cardsClicked.includes(card) || card.classList.contains("flip")) {
        return; // Prevent flipping the same card twice
    }
    totalMoves++;
    movesEl.textContent = `Moves : ${totalMoves}`;
    if(move < maxMove) {
        card.classList.add("flip");
        setTimeout(()=>{
            card.firstElementChild.style.visibility = "visible";
        },500);        
        cardsClicked.push(card);
        move++;
    } 
    if(move === 2) {
        document.body.style.pointerEvents = "none";      
        
        if(cardsClicked[0].firstElementChild.textContent === cardsClicked[1].firstElementChild.textContent) {
            points++;
            pointsEl.textContent = `Points : ${points}`;
            setTimeout(()=>{
                resetState();
            },1000);
        } else {
            setTimeout(()=> {
                cardsClicked.forEach((cardClicked) => {
                    cardClicked.classList.remove("flip");
                    setTimeout(()=>{
                        cardClicked.firstElementChild.style.visibility = "hidden";
                    },400);                    
                }); 
                resetState();
            },2000);                            
        }      
    } 
}

function resetState() {
    cardsClicked = [];
    move = 0;
    document.body.style.pointerEvents = "auto";
}

cards.forEach((card) => {
    card.addEventListener("click", () => {
        CardClicked(card)
    }
)});

GameInit();
