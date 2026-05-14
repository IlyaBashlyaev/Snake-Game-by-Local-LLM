const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
let snake = [{ x: 100, y: 100 }];
let direction = { x: 0, y: 0 };
let food = {};
let score = 0;

function randomFoodPosition() {
  return {
    x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
  };
}

function drawRect(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, gridSize, gridSize);
}

function update() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  if (food.x === undefined && food.y === undefined) food = randomFoodPosition();

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = randomFoodPosition();
  } else {
    snake.pop();
  }

  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    alert('Game Over! Your score: ' + score);
    document.location.reload();
    return;
  }

  snake.unshift(head);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(food.x, food.y, 'red');
  snake.forEach(segment => drawRect(segment.x, segment.y, 'green'));
}

function changeDirection(event) {
  const keyPressed = event.keyCode;

  if (keyPressed === 37 && direction.x !== gridSize) direction = { x: -gridSize, y: 0 };
  else if (keyPressed === 38 && direction.y !== gridSize) direction = { x: 0, y: -gridSize };
  else if (keyPressed === 39 && direction.x !== -gridSize) direction = { x: gridSize, y: 0 };
  else if (keyPressed === 40 && direction.y !== -gridSize) direction = { x: 0, y: gridSize };
}

document.addEventListener('keydown', changeDirection);

setInterval(update, 100);