console.log("hello gamer")

let startButton = document.getElementById("startButton")
startButton.addEventListener("click", createPuzzle)


function createPuzzle() {
    let gameTable = document.getElementById("mainTable");
    for (let i = 1; i <=9; i++){
        let puzzlePiece = document.createElement("div");
        puzzlePiece.setAttribute("class","puzzleElement");
        puzzlePiece.textContent= i;
        gameTable.appendChild(puzzlePiece)

    }

}

dragula([document.getElementById('mainTable')]);