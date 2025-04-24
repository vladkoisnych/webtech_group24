const canvas = document.getElementById("myCanvas");

  const ctx = canvas.getContext("2d");

    let gameWon = false;
    let board = [];
    let currentPlayer="aqua";
     let radius = 40;
   console.log(board);

for(let row = 0; row < 6; row++) {
        board[row] = [];
        for (let column = 0; column < 7; column++) {
            board[row][column] = null;
        }
    }
ctx.globalCompositeOperation = "destination-out";

function boardDrawing(){
if(gameWon) return;
 ctx.fillStyle= "#376996";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

for (let row = 0; row < 6; row++) {
    for (let column = 0; column < 7; column++){
   let x = column * 100 + 50;
   let y =  row * 100 + 50;

        ctx.beginPath();
        ctx.arc(x,y,radius,0,2 * Math.PI);

       if(board[row][column] == "aqua"){
           ctx.fillStyle = "#00FFFF";
                ctx.fill();
               ctx.strokeStyle= "#FFFFFF";
               ctx.stroke();
       }

        else if(board[row][column] == "magenta"){
        ctx.fillStyle = "#FF00FF";
        ctx.fill();
        ctx.strokeStyle= "#FFFFFF";
        ctx.stroke();
           }

            else{
            ctx.globalCompositeOperation = "destination-out";
            ctx.fill();
            ctx.stroke();
            ctx.globalCompositeOperation = "source-over";
            }
         }
       }
   }
boardDrawing();



function boardClick(event){
    console.log("You have clicked the board!");
  let xInCanvas =   event.clientX - canvas.getBoundingClientRect().left
    let columnSector = Math.floor(xInCanvas/100);

    if (columnSector >= 0 && columnSector <= 6){
    console.log("Placement is within the area");

         let row = insertCounter(currentPlayer,columnSector);
        if(row != null){
          boardDrawing();

        if(winChecker(row,columnSector,currentPlayer)){
            gameWon = true;
            alert(currentPlayer + " won!")
            return;
            }

        if(currentPlayer == "aqua"){
            currentPlayer= "magenta";
            } else {
            currentPlayer= "aqua";
            }
        }
     }  else {
   console.log("You cannot insert your counter here. Please re-insert");
   }
}



function insertCounter(player,column){
for (let row = 5; row >= 0; row--){
if(board[row][column] == null){
    board[row][column] = player;
    console.log("placed" ,player,"at",row,column)
    return row;
        }
      }
     console.log("Column full at", column)
    return null;
}


function verticalwinCheck(row,column,player){
if(
board[row][column] == player &&
       board[row+1][column] == player &&
            board[row+2][column] == player &&
                board[row+3][column] == player
     ){
     return true;
    }
    return false;
}

function horizontalwinCheck(row,column,player){
if(
board[row][column] == player &&
       board[row][column+1] == player &&
            board[row][column+2] == player &&
                board[row][column+3] == player
    ){
    return true;
   }
   return false;
 }
function diagonalwinCheck(row,column,player){
if(
board[row][column] == player &&
       board[row+1][column+1] == player &&
            board[row+2][column+2] == player &&
                board[row+3][column+3] == player
    ){
    return true;
    }
    return false;
   }
function diagonalwinCheck2(row,column,player){
if(
board[row][column] == player &&
       board[row-1][column-1] == player &&
            board[row-2][column-2] == player &&
                board[row-3][column-3] == player
    ){
    return true;
    }
    return false;
 }

 function winChecker(row,column,player){
  if(
    horizontalwinCheck(row,column,player) ||
    verticalwinCheck(row,column,player) ||
    diagonalwinCheck(row,column,player) ||
    diagonalwinCheck2(row,column,player)
    ){
      alert("You have won!");
     return true;
     }
      return false;
 }
canvas.addEventListener("click",boardClick);
