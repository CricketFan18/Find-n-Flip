const cards = document.querySelectorAll(".card");
const items = ["Captain America","Daredevil","Iron Man","Spider-Man","Deadpool","Wolverine","Hulk","Thor","Ant-Man","Dr Strange","Black Panther","Thanos"];
const pairs = items.flatMap(card => [card, card]);
const pointsEl = document.getElementById("points");
const movesEl = document.getElementById("moves");

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
GameInit();

let points = 0;
let totalMoves = 0;
let move = 0;
let cardsClicked = [];
const maxMove = 2;

function CardClicked(card){
    totalMoves++;
    movesEl.textContent = `Moves : ${totalMoves}`;
    const p = card.firstElementChild
    if(move < maxMove) {
        p.style.visibility = "visible";
        cardsClicked.push(p);
        move++;
    } 
    if(move === 2) {
        document.body.style.pointerEvents = "none";
        console.log(cardsClicked[0].textContent);
        console.log(cardsClicked[1].textContent);    

        if(cardsClicked[0].textContent === cardsClicked[1].textContent) {
            points++;
            pointsEl.textContent = `Points : ${points}`;
            setTimeout(()=>{
                resetState();
            },1000);
        } else {
            setTimeout(()=> {
                cardsClicked.forEach((card) => {
                    card.style.visibility = "hidden";
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
