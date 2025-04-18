
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
   let x = 100 + column * 100;
   let y = 100 + row * 100;
        ctx.beginPath();
        ctx.arc(x,y,radius,0,2 * Math.PI);
        ctx.fill();
        ctx.stroke();
           }
       }
   }
boardDrawing();
ctx.globalCompositeOperation = "source-over";


function boardClick(event){
    console.log("You have clicked the board!");
  let xInCanvas =   event.clientX - canvas.getBoundingClientRect().left
    let columnSector = Math.floor(xInCanvas/100);
    if (columnSector >= 0 && columnSector <= 6){
    console.log("Placement is within the area");

    //let counterPlacement = true;

    insertCounter(currentPlayer,columnSector);
    boardDrawing();
    }
    if(currentPlayer == "Yellow"){
        currentPlayer="Red";
        } else {
        currentPlayer= "Yellow";
        }

     }  else {
   //counterPlacement = false;
   console.log("Please re-select your placement")
   }
canvas.addEventListener("click",boardClick);


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



