
const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");


    let board = [];
    let currentPlayer="Yellow";
     let radius = 40;


for(let row = 0; row < 6; row++) {
        board[row] = [];
        for (let column = 0; column < 7; column++) {
            board[row][column] = null;
        }
    }
ctx.globalCompositeOperation = "destination-out";

function boardDrawing(){
 ctx.fillStyle= "#376996";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

for (let row = 0; row < 6; row++) {
    for (let column = 0; column < 7; column++){
   let x = 100 + column * 100 + 50;
   let y = 100 + row * 100 + 50;
        ctx.beginPath();
        ctx.arc(x,y,radius,0,2 * Math.PI);

       if(board[row][column] == "Red"){
           ctx.fillStyle = "Red";
               ctx.stroke();
       }

        if(board[row][column] == "Yellow"){
        ctx.fillStyle = "Yellow";
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
    insertCounter(currentPlayer,columnSector);
    boardDrawing();

        if(currentPlayer == "Yellow"){
            currentPlayer="Red";
            } else {
            currentPlayer= "Yellow";
            }

     }  else {
   //counterPlacement = false;
   console.log("Please re-select your placement")
   }



let row;
let column;


    console.log(board);

function insertCounter(player,column){

let counterPlacement = false;

for (let row = 5; row >= 0; row--){
if(board[row][column] == null){
    board[row][column] = player;
    console.log("Insert your counter!");
    counterPlacement = true;
    break;
    }
  }


if(counterPlacement){
console.log("Valid placement");
}
else  {
console.log("invalid placement");
      }
    }
//canvas.addEventListener("click",insertCounter);
}
canvas.addEventListener("click",boardClick);

