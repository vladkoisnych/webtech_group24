const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const overCanvas = document.getElementById('gameOver');
const overContext = overCanvas.getContext('2d');
const nextCanvas = document.getElementById('next');
const nextContext = nextCanvas.getContext('2d');
const scoreLabel = document.getElementById('scoreLbl');
const restartBtn = document.getElementById('playAgain');

restartBtn.addEventListener('click', () => {
  location.reload();
});

const grid = 32;
const tetrominoSequence = [];
const playfield = Array.from({ length: 20 }, () => Array(10).fill(0));
var score = 0;


//pre detrmined tetriminos and their usual assigned colours
const tetrominos = {
  'I': [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  'J': [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
  'L': [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
  'O': [[1, 1], [1, 1]],
  'S': [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
  'Z': [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
  'T': [[0, 1, 0], [1, 1, 1], [0, 0, 0]]
};

const colours = {
  'I': 'cyan', 'J': 'blue', 'L': 'orange',
  'O': 'yellow', 'S': 'green', 'T': 'purple', 'Z': 'red'
};

let tetromino = getNextTetromino();
let nextTetromino = getNextTetromino();
let gameOver = false;
let dropCounter = 0;
let lastTime = 0;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSequence() {
  const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  while (sequence.length) {
    const rand = getRandomInt(0, sequence.length - 1);
    tetrominoSequence.push(sequence.splice(rand, 1)[0]);
  }
}

function getNextTetromino() {
  if (tetrominoSequence.length === 0) generateSequence();
  const name = tetrominoSequence.pop();
  return {
    name,
    matrix: tetrominos[name],
    row: name === 'I' ? -1 : -2,
    col: Math.floor(playfield[0].length / 2 - tetrominos[name][0].length / 2)
  };
}

function rotate(matrix) {
  return matrix[0].map((_, index) => matrix.map(row => row[index])).reverse();
}

function isValidMove(matrix, cellRow, cellCol) {
  return matrix.every((row, r) =>
    row.every((cell, c) => !cell || (
      cellCol + c >= 0 && cellCol + c < 10 &&
      cellRow + r < 20 && !playfield[cellRow + r]?.[cellCol + c]
    ))
  );
}

function placeTetromino() {
  tetromino.matrix.forEach((row, r) => row.forEach((cell, c) => {
    if (cell) {
      if (tetromino.row + r <= 0) return showGameOver();
      playfield[tetromino.row + r][tetromino.col + c] = tetromino.name;
    }
  }));

  playfield.forEach((row, r) => {
    if (row.every(cell => cell)) {
      playfield.splice(r, 1);
      playfield.unshift(Array(10).fill(0));
      score+=100;
    }
  });

  tetromino = nextTetromino;
  nextTetromino = getNextTetromino();
}

function showGameOver() {
  gameOver = true;
  console.log("Game Over");
  const highestScore = localStorage.getItem('highestScore') || 0;
  if (score > highestScore) {
    localStorage.setItem('highestScore', score);
  }
  overCanvas.style.display = "inline";
  overContext.fillStyle = 'black';
  overContext.globalAlpha = 0.75;
  overContext.fillRect(0, overCanvas.height / 2 - 30, overCanvas.width, 160);
  overContext.globalAlpha = 1;
  overContext.fillStyle = 'white';
  overContext.font = '36px monospace';
  overContext.textAlign = 'center';
  overContext.fillText('GAME OVER!', overCanvas.width / 2, overCanvas.height / 2);
  overContext.fillText('SCORE: ' + score, overCanvas.width / 2, overCanvas.height / 2 + 40);

  const savedHighScore = localStorage.getItem('highestScore') || 0;
  overContext.fillText('HIGHEST: ' + savedHighScore, overCanvas.width / 2, overCanvas.height / 2 + 80);
  canvas.style.display = "none";
  nextCanvas.style.display = "none";
  scoreLabel.style.display = "none";

  restartBtn.style.display = "inline";
}



function getGhostPosition() {
  let ghostRow = tetromino.row;
  while (isValidMove(tetromino.matrix, ghostRow + 1, tetromino.col)) {
    ghostRow++;
  }
  return ghostRow;
}

function drawNextTetromino() {
  nextContext.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
  nextContext.fillStyle = colours[nextTetromino.name];

  nextTetromino.matrix.forEach((row, r) => row.forEach((cell, c) => {
    if (cell) {
      nextContext.fillRect(c * grid, r * grid, grid - 1, grid - 1);
      nextContext.strokeRect(c * grid, r * grid, grid, grid);
    }
  }));
}

function drawPlayfield() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  playfield.forEach((row, r) => row.forEach((cell, c) => {
    if (cell) {
      context.fillStyle = colours[cell];
      context.fillRect(c * grid, r * grid, grid - 1, grid - 1);
      context.strokeRect(c * grid, r * grid, grid, grid);
    }
  }));
}

function drawTetromino() {
  let ghostRow = getGhostPosition();

  context.fillStyle = "rgba(255,255,255,0.3)";
  tetromino.matrix.forEach((row, r) => row.forEach((cell, c) => {
    if (cell) {
      context.fillRect((tetromino.col + c) * grid, (ghostRow + r) * grid, grid - 1, grid - 1);
    }
  }));

  context.fillStyle = colours[tetromino.name];
  tetromino.matrix.forEach((row, r) => row.forEach((cell, c) => {
    if (cell) {
      context.fillRect((tetromino.col + c) * grid, (tetromino.row + r) * grid, grid - 1, grid - 1);
      context.strokeRect((tetromino.col + c) * grid, (tetromino.row + r) * grid, grid, grid);
    }
  }));
}

function update(time = 0) {
  if (gameOver) return;
  const deltaTime = time - lastTime;
  lastTime = time;
  scoreLabel.innerText = score;

  dropCounter += deltaTime;
  if (dropCounter > 1000) {
    if (isValidMove(tetromino.matrix, tetromino.row + 1, tetromino.col)) {
      tetromino.row++;
    } else {
      placeTetromino();
    }
    dropCounter = 0;
  }

  drawPlayfield();
  drawTetromino();
  drawNextTetromino();
  requestAnimationFrame(update);
}

document.addEventListener('keydown', (e) => {
  if (gameOver) return;

  if (e.key === 'ArrowLeft' && isValidMove(tetromino.matrix, tetromino.row, tetromino.col - 1)) {
    tetromino.col--;
  }
  if (e.key === 'ArrowRight' && isValidMove(tetromino.matrix, tetromino.row, tetromino.col + 1)) {
    tetromino.col++;
  }
  if (e.key === 'ArrowDown' && isValidMove(tetromino.matrix, tetromino.row + 1, tetromino.col)) {
    tetromino.row++;
  }
  if (e.key === 'ArrowUp') {
    const rotated = rotate(tetromino.matrix);
    if (isValidMove(rotated, tetromino.row, tetromino.col)) tetromino.matrix = rotated;
  }
});

update();