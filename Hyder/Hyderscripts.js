


    const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
    ctx.fillStyle= "#376996";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

function boardClick(event){
    console.log("You have clicked the board!");
  let xInCanvas =   event.clientX - getBoundingClientRect().left

}
canvas.addEventListener("click",boardClick);


let board = [];
let row;
let column;


    for( row = 0; row < 6; row++) {
        board[row] = [];
        for ( column = 0; column < 7; column++) {
            board[row][column] = null;
        }
    }

    console.log(board);

function insertCounter(counter,player){
for (row = 5; row >= 0; row--){
if(board[row][column] == null)
    board[row][column] = 'x';
    }
     console.log("Insert your counter!");
   }
}


if(board[row][column] == null){
console.log("Valid placement");
}
else {
console.log("invalid placement");
}

canvas.addEventListener("click",insertCounter);



