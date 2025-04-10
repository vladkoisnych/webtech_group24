


    const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
    ctx.fillStyle= "#376996";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

function handleClick(event){
    console.log("You have clicked the board!");
}
canvas.addEventListener("click",handleClick);


let board = [];
    for(let row = 0; row < 6; row++) {
        board[row] = [];
        for (let column = 0; column < 7; column ++) {
            board[row][column] = null;
        }
    }
console.log("Script is running");
console.log(board);

