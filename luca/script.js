let board = ["", "", "", "", "", "", "", "", ""];
let turn = "X";
let gameDone = false;

window.onload = function() {
    makeBoard();
    document.getElementById("reset").addEventListener("click", restart);
};

function makeBoard() {
    let container = document.getElementById("board");
    for (let i = 0; i < 9; i++) {
        let square = document.createElement("div");
        square.classList.add("tile");
        square.id = i;
        square.addEventListener("click", clicked);
        container.appendChild(square);
    }
}

function clicked() {
    if (gameDone || board[this.id] !== "") {
        return;
    }

    board[this.id] = turn;
    this.innerText = turn;

    if (checkWin(turn)) {
        document.getElementById("status").innerText = `${turn} wins! 🎉`;
        gameDone = true;
    } else if (board.indexOf("") === -1) {
        document.getElementById("status").innerText = "Draw!";
        gameDone = true;
    } else {
        turn = (turn === "X") ? "O" : "X";
        document.getElementById("status").innerText = `${turn}'s turn`;
    }
}

function checkWin(player) {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (let combo of wins) {
        if (board[combo[0]] === player && board[combo[1]] === player && board[combo[2]] === player) {
            combo.forEach(i => {
                document.getElementById(i).classList.add("winner");
            });
            return true;
        }
    }
    return false;
}

function restart() {
    board = ["", "", "", "", "", "", "", "", ""];
    turn = "X";
    gameDone = false;
    document.getElementById("status").innerText = "";
    document.getElementById("board").innerHTML = "";
    makeBoard();
}
