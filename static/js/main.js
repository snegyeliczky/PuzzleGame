(function() {
    let urlPath = "/static/pictures/hedgehog.jpg";


    let loadFile = function (event) {
        document.getElementById('mainTable').style.backgroundImage = "url('" + URL.createObjectURL(event.target.files[0]) + "')";
        urlPath = URL.createObjectURL(event.target.files[0]);

    };


    function swapTiles(cell1, cell2) {
        let tempClass = document.getElementById(cell1).className;
        let tempData = document.getElementById(cell1).dataset.order;
        document.getElementById(cell1).className = document.getElementById(cell2).className;
        document.getElementById(cell1).dataset.order = document.getElementById(cell2).dataset.order;
        document.getElementById(cell2).className = tempClass;
        document.getElementById(cell2).dataset.order = tempData;
    }


    function shuffle() {
        for (let row = 1; row <= 3; row++) {
            for (let column = 1; column <= 3; column++) {
                let row2 = Math.floor(Math.random() * 3 + 1);
                let column2 = Math.floor(Math.random() * 3 + 1);
                swapTiles("puzzle" + row + column, "puzzle" + row2 + column2);
            }
        }
    }


    function createPuzzle() {
        let gameTable = document.getElementById("mainTable");
        let x = 1;
        for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++) {
                let puzzlePiece = document.createElement("div");
                puzzlePiece.setAttribute("class", "puzzleElement puzzle" + i + j);
                puzzlePiece.setAttribute("id", "puzzle" + i + j);
                puzzlePiece.dataset.order = "" + i + j;
                puzzlePiece.textContent = x;

                x++;
                puzzlePiece.style.backgroundImage = "url('" + urlPath + "')";
                gameTable.appendChild(puzzlePiece);
            }
        }
        startButton.disabled = true;
    }


    function startAnimation() {
        anime({
            targets: "#mainTable",
            rotate: '2turn',
            duration: 3500

        });
    }

    function endTurn() {
        anime({
            targets: "#mainTable",
            scale: 2,
            loop: true
        });

    }

    function endAnimation() {
        anime({
            targets: '.puzzleElement',
            scale: [
                {value: .1, easing: 'easeOutSine', duration: 1000},
                {value: 1, easing: 'easeInOutQuad', duration: 1700}
            ],
            delay: anime.stagger(1500, {grid: [3, 3], from: 'center'}),
        });

    }


    function getOrder() {
        let elements = document.getElementsByClassName("puzzleElement");
        let idList = [];
        for (let element of elements) {
            let elementId = element.getAttribute("data-order");
            idList.push(elementId)
        }
        return idList
    }

    let startButton = document.getElementById("startButton");
    startButton.addEventListener("click", main);

    function main() {
        let pick = 0;
        let counter = document.getElementById("tick-counter");
        counter.textContent = "Counter: " + pick;
        createPuzzle();
        const rightOrder = getOrder();
        shuffle();
        startAnimation();
        dragula([document.getElementById('mainTable')])
            .on("drop", function () {
                pick++;
                console.log(pick);
                counter.textContent = "Counter: " + pick;
            })
            .on("dragend", function () {
                let numbers = getOrder();
                if (numbers.toString() === rightOrder.toString()) {
                    let mainTable = document.getElementById('mainTable');
                    mainTable.style.background = "black";
                    endAnimation();
                }
            });
    }
}());

