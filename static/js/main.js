console.log("hello gamer");


let startButton = document.getElementById("startButton");
startButton.addEventListener("click", createPuzzle);


function swapTiles(cell1,cell2) {
  let temp = document.getElementById(cell1).className;
  document.getElementById(cell1).className = document.getElementById(cell2).className;
  document.getElementById(cell2).className = temp;
}


function shuffle() {
    for (let row=1 ;row<=3 ;row++) {
       for (let column=1 ;column<=3 ;column++) {
           let row2 = Math.floor(Math.random()*3 + 1);
           let column2 = Math.floor(Math.random()*3 + 1);
           swapTiles("puzzle"+row+column,"puzzle"+row2+column2);
       }
    }
}


function createPuzzle() {
    let gameTable = document.getElementById("mainTable");
    let x = 1;
    for (let i = 1; i <= 3; i++){
        for (let j = 1; j <= 3; j++) {
            let puzzlePiece = document.createElement("div");
            puzzlePiece.setAttribute("class", "puzzleElement" + " " + "puzzle" + i + j);
            puzzlePiece.setAttribute("id", "puzzle" + i + j);
            puzzlePiece.textContent = x;
            x++;
            gameTable.appendChild(puzzlePiece);
        }
    }
    shuffle();
}


dragula([document.getElementById('mainTable')]);