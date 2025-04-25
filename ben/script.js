//initialise variables

//gameStatus - the message that appears to show the status of the game - WIN, TIE, WHOS TURN IT IS
//gameActive - current state of the game
//currentPlayer - the current players whose turn it is. X moves first
//piecePositions - all the cells on the board

const gameStatus = document.querySelector('.gameStatus');
let gameActive = true;
let currentPlayer = "X";
let piecePositions = ["", "", "", "", "", "", "", "", ""];

//messages to update gameStatus with when appropriate
const winMessage = () => `${currentPlayer} wins`;
const tieMessage = () => "It is a tie.";
const playerTurn = () => `${currentPlayer}'s move`;

//set gameStatus to show which player's turn it is
gameStatus.innerHTML = playerTurn();

//event listener for when a cell on the grid is clicked
document.querySelectorAll('.gridCell').forEach(cell => cell.addEventListener('click', cellClick));

//event listener for the button to reset the game
document.querySelector('.restartGame').addEventListener('click', restartGame);

//function to register when a cell is clicked
function cellClick(clickedCellEvent) {   
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(
          clickedCell.getAttribute('data-cell-index')
        );
    
        if (piecePositions[clickedCellIndex] !== "" || !gameActive) {
            return;
        }
   
        handleCellClick(clickedCell, clickedCellIndex);
        checkResult();
}

//ensure that the cell clicked is filled with an X or O depending on whose turn it is
function handleCellClick(clickedCell, clickedCellIndex) {
    
        piecePositions[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
    }

//every possible winning condition
const winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];

//function to check if a winning condition has been met
function checkResult() {
    let wonGame = false;

    for (let i = 0; i <= 7; i++) {
        const win = winners[i];
        let a = piecePositions[win[0]];
        let b = piecePositions[win[1]];
        let c = piecePositions[win[2]];
        
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            wonGame = true;
            break
        }
    }

    //if the game is won, end the game and show which player won
    if (wonGame) {
        gameStatus.innerHTML = winMessage();
        gameActive = false;
        return;
    }

    //if nobody wins, show tie message
    let tiedGame = !piecePositions.includes("");
    if (tiedGame) {
        gameStatus.innerHTML = tieMessage();
        gameActive = false;
        return;
    }

    //change player
    changePlayer();
}

//function to change player once the other player has had their turn
function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameStatus.innerHTML = playerTurn();
}

//function to restart game once button is clicked
function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    piecePositions.fill("");
    gameStatus.innerHTML = playerTurn();
    document.querySelectorAll('.gridCell').forEach(cell => cell.textContent = "");
}