const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameMessage = document.getElementById('game-message');
const restartBtn = document.getElementById('restart-btn');

const gridSize = 20;
const tileCountX = canvas.width / gridSize;
const tileCountY = canvas.height / gridSize;

let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 15};
let dx = 0;
let dy = 0;
let score = 0;
let gameInterval;
let isGameRunning = false;

function startGame() {
  if (gameInterval) clearInterval(gameInterval);
  isGameRunning = true;
  dx = 1;
  dy = 0;
  snake = [{x: 10, y: 10}];
  score = 0;
  scoreElement.textContent = score;
  gameMessage.style.display = 'none';
  placeFood();
  gameInterval = setInterval(gameLoop, 100);
}

function gameLoop() {
  if (!isGameRunning) return;

  dx = dx; dy = dy;

  let newSnakeHead = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(newSnakeHead);

  if (isFoodInSnake(food.x, food.y)) {
    score++;
    scoreElement.textContent = score;
    placeFood();
  } else {
    snake.pop();
  }

  if (isGameOver()) {
    endGame();
  }

  drawGame();
}

function placeFood() {
  while (true) {
    food = {
      x: Math.floor(Math.random() * tileCountX),
      y: Math.floor(Math.random() * tileCountY)
    };
    if (!isFoodInSnake(food.x, food.y)) break;
  }
}

function isFoodInSnake(ex, ey) {
  return snake.some(segment => segment.x === ex && segment.y === ey);
}

function isGameOver() {
  if (snake[0].x < 0 || snake[0].x >= tileCountX || 
      snake[0].y < 0 || snake[0].y >= tileCountY) return true;

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) return true;
  }
  return false;
}

function endGame() {
  isGameRunning = false;
  clearInterval(gameInterval);
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
  gameMessage.style.display = 'block';
}

function drawGame() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0f0';
  snake.forEach((segment, index) => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
  });

  ctx.fillStyle = '#f00';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      if (dx !== 1) { dx = -1; dy = 0; }
      break;
    case 'ArrowUp':
      if (dy !== 1) { dx = 0; dy = -1; }
      break;
    case 'ArrowRight':
      if (dx !== -1) { dx = 1; dy = 0; }
      break;
    case 'ArrowDown':
      if (dy !== -1) { dx = 0; dy = 1; }
      break;
  }
});

restartBtn.addEventListener('click', startGame);

// Initialize game
startGame();