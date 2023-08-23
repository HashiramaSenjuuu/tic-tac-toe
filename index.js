
let topHeading = document.getElementById("heading");
let gameOver = false;
let audio = new Audio("./assets/ting.mp3")
let music = new Audio("./assets/music.mp3")
let gameOverSound = new Audio("./assets/gameover.mp3")

//Function to change turn

let turn = "X"

const changeTurn = () => {
    return turn === "X" ? "O" : "X"
}


//Function to check for a win
const checkWin = () => {

    let grids = document.getElementsByClassName("element");

    let winningPositions = [
        [0,1,2, 0,-109, 0],
        [3,4,5, 0,0,0],
        [6,7,8, 0,112,0],
        [0,3,6, -145,0,90],
        [1,4,7 ,0,0,90],
        [2,5,8, 145,0,90],
        [0,4,8, 0,0,45],
        [6,4,2, 0,0,-45]
    ]

    winningPositions.forEach( e => {
       if((grids[e[0]].innerText === grids[e[1]].innerText) && (grids[e[1]].innerText === grids[e[2]].innerText) && (grids[e[0]].innerText !== ""))
       {

            topHeading.innerHTML = grids[e[0]].innerText + " has won"
            gameOver = true
            let gifs = document.getElementsByTagName("img")
            Array.from(gifs).forEach(e=>{
                e.style.width = "250px";
            })

            let line = document.getElementById("line")
            line.style.transform = `translate(${e[3]}px, ${e[4]}px) rotate(${e[5]}deg)`
            line.style.visibility = "visible"

       }
    })

    if(gameOver){
        music.play()
    }

    
}

//Game Logic  

const grid_To_Be_clicked = document.getElementsByClassName("element");

// console.log(Array.from(grid_To_Be_clicked))
Array.from(grid_To_Be_clicked).forEach((element)=>{

    element.addEventListener('click', ()=>{
        if(element.innerText === ""){
            element.innerText = turn;
            turn = changeTurn();

            // Play Audio
            audio.play();

            // checkFor win 
            checkWin()

            //change top heading into turn for next player
            if(!gameOver){
                topHeading.innerHTML = "Turn for " + turn
            }
            



        }
    })
})




//Start new game

let reset = document.querySelector('.btn');
reset.addEventListener('click', ()=>{
    Array.from(grid_To_Be_clicked).forEach((element) => {
        element.innerText = "";
        turn = "X";
        topHeading.innerHTML = "Turn for " + turn

    })

    let gifs = document.getElementsByTagName("img")
            Array.from(gifs).forEach(e=>{
                e.style.width = "0px"
            })

    line.style.visibility = "hidden"

    gameOver=false
    music.pause()
    music.currentTime = 0
})