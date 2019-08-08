console.log("hello gamer");

function swapTiles(cell1,cell2) {
  let tempClass = document.getElementById(cell1).className;
  let tempData = document.getElementById(cell1).dataset.order;
  document.getElementById(cell1).className = document.getElementById(cell2).className;
  document.getElementById(cell1).dataset.order = document.getElementById(cell2).dataset.order;
  document.getElementById(cell2).className = tempClass;
  document.getElementById(cell2).dataset.order = tempData;
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
            puzzlePiece.setAttribute("class", "puzzleElement puzzle" + i + j);
            puzzlePiece.setAttribute("id", "puzzle" + i + j);
            puzzlePiece.dataset.order=""+i + j
            puzzlePiece.textContent = x;

            x++;
            gameTable.appendChild(puzzlePiece);
        }
    }
    startButton.disabled = true;
}


function startAnimation() {
    anime({
        targets:"#mainTable",
        rotate: '2turn',
        duration:3500

});

}


function getOrder(){
    let elements = document.getElementsByClassName("puzzleElement");
    let idList = []
    for (let element of elements) {
        let elementId =element.getAttribute("data-order")
        idList.push(elementId)
    }
    return idList
}

let startButton = document.getElementById("startButton");
startButton.addEventListener("click", main);

function main(){
    createPuzzle()
    let pick = 0;
    const rightOrder = getOrder();
    console.log(rightOrder)
    shuffle();
    startAnimation()
    dragula([document.getElementById('mainTable')])
        .on("drop", function () {
            pick++
            console.log(pick)
        })
        .on("dragend", function (){
            let numbers = getOrder();
            console.log(numbers);
            console.log(rightOrder)
            if (numbers.toString() == rightOrder.toString()){
                alert("YOU WIN FROM "+pick+ " pick !!!");
                anime({
                      targets: '#gameTable',
                      scale: [
                        {value: .1, easing: 'easeOutSine', duration: 500},
                        {value: 1, easing: 'easeInOutQuad', duration: 1200}
                      ],
                      delay: anime.stagger(200, {grid: [3, 3], from: 'center'})
                    });
        }});

};
