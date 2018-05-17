const map = [
    "  WWWWW ",
    "WWW   W ",
    "WOSB  W ",
    "WWW BOW ",
    "WOWWB W ",
    "W W O WW",
    "WB XBBOW",
    "W   O  W",
    "WWWWWWWW"
  ];
const main = document.getElementById("main");
let currentColumn = 1;
let cellNumber = "";
let rowNumber = "";

//gamePiece is the active character the player directly controls
let gamePiece = document.createElement("div");
let pacmanDirection = "rotate(0)"
gamePiece.classList.add("gamePiece");
gamePiece.id = "gamePiece";

// for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
//     const row = map[rowIndex]
function createMaze() {
    map.forEach((row, rowIndex) => {
        // makes row
        let displayRow = document.createElement("div");
        displayRow.classList.add("row")
        let rowNumber = displayRow.dataset.cellY = rowIndex
        main.appendChild(displayRow);
        createCell(row, displayRow);
    })
}

function createCell(row, displayRow) {
    for (let cell of row) {
        //create Div's for each cell, append into rows
        let displayCell = document.createElement("div");
        displayCell.classList.add("cell");
        displayRow.appendChild(displayCell);
        displayCell.dataset.cellX = displayRow.childElementCount;
        displayCell.dataset.cellY = displayRow.dataset.cellY

        assignCellType(cell, displayCell);
    }
}

function assignCellType(cell, displayCell) {
    switch (cell) {

        case cell = " ":
            displayCell.classList.add("movable");
            break;
        case cell = "W":
            displayCell.classList.add("wall");
            break;

        case cell = "S":
            displayCell.id = "startPosition";
            displayCell.classList.add("movable");
            displayCell.appendChild(gamePiece);
            break;

            case cell = "O":
            displayCell.classList.add("O");
            displayCell.classList.add("movable");
            break;

            case cell = "B":
            displayCell.classList.add("B");
            // displayCell.appendChild(storageLocation)
            break;
    }
}

function moveCell(yOffset, xOffset,yTwoCellOffset,xTwoCellOffset) {
    
    const yMove = parseInt(gamePiece.parentElement.dataset.cellY) + yOffset;
    const xMove = parseInt(gamePiece.parentElement.dataset.cellX) + xOffset;
    const yTwoMoves = parseInt(gamePiece.parentElement.dataset.cellY) + yTwoCellOffset;
    const xTwoMoves = parseInt(gamePiece.parentElement.dataset.cellX) + xTwoCellOffset;
    const twoCellAway = document.querySelector('[data-cell-y="' + yTwoMoves + '"][data-cell-x="' + xTwoMoves + '"]');
    const nextCell = document.querySelector('[data-cell-y="' + yMove + '"][data-cell-x="' + xMove + '"]');

    if ((!nextCell.classList.contains("wall") && !nextCell.classList.contains("B")) 
        ||
        ((nextCell.classList.contains("B") && !twoCellAway.classList.contains("B")))
        && 
        (nextCell.classList.contains("B") && !twoCellAway.classList.contains("wall"))){  
         nextCell.appendChild(gamePiece);
         console.log("hey")    
    }

    if(!twoCellAway.classList.contains("B") && nextCell.classList.contains("B") && !twoCellAway.classList.contains("wall")){
        nextCell.classList.remove("B");
        twoCellAway.classList.add("B")
    }
}
 
//function checkmove(event) was originally used below, why do I need event???
function checkMove() {
    event.preventDefault();
    console.log('keydown event\n\n' + 'key: ' + event.key);

    switch (event.key) {
        case "ArrowDown":
            moveCell(+1, 0,+2,0);
            pacmanDirection = "rotate(90deg)";
            break;

        case "ArrowUp":
            moveCell(-1, 0,-2, 0);
            pacmanDirection = "rotate(-90deg)";
            break;

        case "ArrowRight":
            moveCell(0, +1, 0, +2)
            pacmanDirection = "rotate(0)";
            break;

        case "ArrowLeft":
            moveCell(0, -1, 0, -2);
            pacmanDirection = "rotate(180deg)";
            break;

    }
    document.getElementById("gamePiece").style.top = boxTop + "px";
    document.getElementById("gamePiece").style.left = boxLeft + "px";
    document.getElementById("gamePiece").style.transform = pacmanDirection;
}
//original below, compare to above
    // if (keyName === "ArrowDown") {
    //     //move down
    //     // console.log("cellY:", gamePiece.parentElement.dataset.cellY)
    //     // console.log("cellX:", gamePiece.parentElement.dataset.cellX)
    //     // let moveDown = parseInt(gamePiece.parentElement.dataset.cellY) + 1;
    //     // let currentX = gamePiece.parentElement.dataset.cellX;
    //     // //checks if classname is only cell, in this case this works, also could do a 'does not contain' className.contain = 
    //     // if (document.querySelector('[data-cell-y="' + moveDown + '"][data-cell-x="' + currentX + '"]').className === "cell") {
    //     //     document.querySelector('[data-cell-y="' + moveDown + '"][data-cell-x="' + currentX + '"]').appendChild(gamePiece);
    //     // }
    //     moveCell(+1, 0);
    //     pacmanDirection = "rotate(90deg)";
    // }

    // //moves box up
    // if (keyName === "ArrowUp") {
    //     // console.log("cellY:", gamePiece.parentElement.dataset.cellY)
    //     // console.log("cellX:", gamePiece.parentElement.dataset.cellX)
    //     // let moveUp = parseInt(gamePiece.parentElement.dataset.cellY) - 1;
    //     // let currentX = gamePiece.parentElement.dataset.cellX;
    //     // if (document.querySelector('[data-cell-y="' + moveUp + '"][data-cell-x="' + currentX + '"]').className === "cell") {
    //     //     document.querySelector('[data-cell-y="' + moveUp + '"][data-cell-x="' + currentX + '"]').appendChild(gamePiece);
    //     // }
    //     moveCell(-1, 0);
    //     pacmanDirection = "rotate(-90deg)";
    // }

    // //moves box right
    // if (keyName === "ArrowRight") {
    //     //this is how to get parent element id
    //     // console.log("cellY:", gamePiece.parentElement.dataset.cellY);
    //     //console.log("cellX:", gamePiece.parentElement.dataset.cellX);
    //     // let moveRight = parseInt(gamePiece.parentElement.dataset.cellX) + 1;
    //     // let currentY = gamePiece.parentElement.dataset.cellY;
    //     // if (document.querySelector('[data-cell-y="' + currentY + '"][data-cell-x="' + moveRight + '"]').className === ("cell")) {
    //     //     //  console.log(document.querySelector('[data-cell-y="9"][data-cell-x="' + moveRight + '"]'));
    //     //     document.querySelector('[data-cell-y="' + currentY + '"][data-cell-x="' + moveRight + '"]').appendChild(gamePiece);
    //     // }
    //     moveCell(0, +1)
    //     pacmanDirection = "rotate(0)";
    // }

    // if (keyName === "ArrowLeft") {
    //     // console.log("cellY:", gamePiece.parentElement.dataset.cellY);
    //     // console.log("cellX:", gamePiece.parentElement.dataset.cellX);
    //     // let moveLeft = parseInt(gamePiece.parentElement.dataset.cellX) - 1;
    //     // let currentY = gamePiece.parentElement.dataset.cellY;
    //     // if (document.querySelector('[data-cell-y="' + currentY + '"][data-cell-x="' + moveLeft + '"]').className === "cell") {
    //     //     document.querySelector('[data-cell-y="' + currentY + '"][data-cell-x="' + moveLeft + '"]').appendChild(gamePiece);
    //     // }
    //     moveCell(0, -1);
    //     pacmanDirection = "rotate(180deg)";
    // }

    



// function checkWin(event) {
//     if (document.getElementById("endPosition").childElementCount === 1) {
//         alert("You win")
//     }
// }

createMaze()
document.addEventListener('keydown', checkMove)
//document.addEventListener('keyup', checkWin)
