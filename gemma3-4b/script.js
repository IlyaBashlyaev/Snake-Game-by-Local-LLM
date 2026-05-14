const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game Settings
const cellWidth = 20;
const cellHeight = 20;
const gridWidth = canvas.width / cellWidth;
const gridHeight = canvas.height / cellHeight;

// Snake
let snake = [];
let direction = 'right';
let score = 0;

// Food
let foodX, foodY;

// Function to generate food
function generateFood() {
  foodX = Math.floor(Math.random() * gridWidth);
  foodY = Math.floor(Math.random() * gridHeight);
}

// Snake Movement
function move() {
  const head = snake[0];
  const newHead = {
    x: head.x + (direction === 'right' ? 1 : (direction === 'left' ? -1 : 0)),
    y: head.y + (direction === 'up' ? 1 : (direction === 'down' ? -1 : 0))
  };

  // Check for collision with self
  if (
    newHead.x < 0 ||
    newHead.x >= gridWidth ||
    newHead.y < 0 ||
    newHead.y >= gridHeight ||
    snake.some(part => part.x === newHead.x && part.y === newHead.y)
  ) {
    // Game Over
    alert("Game Over! Score: " + score);
    resetGame();
    return;
  }

  snake.unshift(newHead);

  // Check if food is eaten
  if (newHead.x === foodX && newHead.y === foodY) {
    score++;
    generateFood();
  } else {
    snake.pop(); // Remove tail segment if not eating food
  }
}

// Game Reset
function resetGame() {
  snake = [];
  direction = 'right';
  score = 0;
  generateFood();

  // Initialize Snake
  for (let i = 0; i < 10; i++) { //Start with 10 segments
    snake.push({ x: i * cellWidth, y: i * cellHeight });
  }
}

// Draw the game
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'green';

  // Draw Food
  ctx.fillRect(foodX * cellWidth, foodY * cellHeight, cellWidth, cellHeight);

  // Draw Snake
  ctx.fillStyle = 'lime';
  snake.forEach(part => {
    ctx.fillRect(part.x, part.y, cellWidth, cellHeight);
  });

  // Draw Score
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 5, 25);
}


// Game Loop
function gameLoop() {
  move();
  draw();
  setTimeout(gameLoop, 100); // Adjust delay for speed
}

// Event Listeners (Arrow Keys)
document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
  }
});

// Start the game
gameLoop();