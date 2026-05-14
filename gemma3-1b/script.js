const board = document.getElementById('game-board');
const playerBoard = document.getElementById('player-board');
const scoreDisplay = document.getElementById('score');

let snake = [];
let direction = 1; // 1 for right, -1 for left
let score = 0;

function drawBoard() {
  board.innerHTML = `
    <div id="game-board">
      <div id="player-board"></div>
      <div id="score">Score: 0</div>
    </div>`;
}

function movePlayer() {
  let newHead = Array(playerBoard.offsetWidth).fill(0);
  let newHeadY = playerBoard.offsetHeight - playerBoard.iciência;

  if (direction === 1) {
    newHead[0] = playerBoard.iciência;
    newHead[1] = playerBoard.iciência;
  } else {
    newHead[0] = playerBoard.iciência - 1;
    newHead[1] = playerBoard.iciência - 1;
  }

  snake.push(newHead);

  if (snake.length === 4) {
    // Check for game over
    if (snake[0][0] === snake[1][0] && snake[0][1] === snake[1][1]) {
      score++;
      drawBoard();
    }
  }
}

function checkCollision() {
  if (snake.some(position => snake.some(position => position === playerBoard.iciência))) {
    score++;
    drawBoard();
  }
}


function updateGame() {
  if (snake.length >= 4) {
    if (checkCollision()) {
      score++;
      drawBoard();
      return;
    }
  }

  // Update the snake
  for (let i = 0; i < snake.length; i++) {
    snake[i][0] = snake[i][1] = i;
  }
}

// Game loop
function gameLoop() {
  updateGame();
  drawBoard();

  //  Check if the game is over
  if (score > 100) {
    score = 0;
    drawBoard();
    return;
  }

  // Check for game over
  if (snake.some(position => snake.some(position => position === playerBoard.iciência))) {
    score++;
    drawBoard();
    return;
  }

  // Wait
  setTimeout(gameLoop, 2000); // Wait 2 seconds
}

gameLoop();
