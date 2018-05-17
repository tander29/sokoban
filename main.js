let map = [
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

//   const map = [
//     "    WWWWW          ",
//     "    W   W          ",
//     "    WB  W          ",
//     "  WWW  BWW         ",
//     "  W  B B W         ",
//     "WWW W WW W   WWWWWW",
//     "W   W WW WWWWW  OOW",
//     "W B  B          OOW",
//     "WWWWW WWW WSWW  OOW",
//     "    W     WWWWWWWWW",
//     "    WWWWWWW        "
//  ]

const main = document.getElementById("main");
let currentColumn = 1;
let cellNumber = "";
let rowNumber = "";
let boardHeight = map.length
let boardWidth = map[0].length
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
        //sizes the cell's based on screen size
        displayCell.style.height = 50/boardHeight + "vh"
        displayCell.style.width = 50/boardWidth + "vw"
        //document.getElementById("gamePiece").style.transform = pacmanDirection;
        displayCell.classList.add("cell");
        displayRow.appendChild(displayCell);
        displayCell.dataset.cellX = displayRow.childElementCount;
        displayCell.dataset.cellY = displayRow.dataset.cellY
        assignCellType(cell, displayCell);
    }
}

//assigns class to cells based on if wall
function assignCellType(cell, displayCell) {
    switch (cell) {

        case cell = "W":
            displayCell.classList.add("wall");
            break;

        case cell = "S":
            displayCell.id = "startPosition";
            displayCell.appendChild(gamePiece);
            break;

            case cell = "O":
            displayCell.classList.add("O");
            break;

            case cell = "B":
            displayCell.classList.add("B");
            // displayCell.appendChild(storageLocation)
            break;

            case cell = "X":
            displayCell.classList.add("B");
            displayCell.classList.add("O");
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
    

    //first if is for movement of game token if (cell not wall & notblock, move) OR (if next cell has block, and two cells away not block or wall, move)
    if ((!nextCell.classList.contains("wall") && !nextCell.classList.contains("B")) 
        ||(
        (nextCell.classList.contains("B") && !twoCellAway.classList.contains("B")))
        && 
        (nextCell.classList.contains("B") && !twoCellAway.classList.contains("wall"))
        ){  
        nextCell.appendChild(gamePiece);    
    }
    // this if is for moving blocks, if nextCell is block, twoCells away not a wall or block, move classList to two cells away from token
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
    document.getElementById("gamePiece").style.transform = pacmanDirection;
}


    


function win (){ 
    const boxOnSpotCount = document.getElementsByClassName("O B");
    const boxCount = document.getElementsByClassName("B");  

    if(boxCount.length === boxOnSpotCount.length){
     alert("You win")
     main.innerHTML=""
     map = [
        "    WWWWW          ",
        "    W   W          ",
        "    WB  W          ",
        "  WWW  BWW         ",
        "  W  B B W         ",
        "WWW W WW W   WWWWWW",
        "W   W WW WWWWW  OOW",
        "W B  B          OOW",
        "WWWWW WWW WSWW  OOW",
        "    W     WWWWWWWWW",
        "    WWWWWWW        "
     ]
        boardHeight = map.length
        boardWidth = map[0].length
     createMaze()
 }
}



document.addEventListener('keyup',win)

createMaze()
document.addEventListener('keydown', checkMove)

//document.addEventListener('keyup', checkWin)
