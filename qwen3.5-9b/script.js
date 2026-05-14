const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

// Game settings
const gridSize = 20; // Size of one square
const tileCount = canvas.width / gridSize; // 20 tiles across
const gameSpeed = 100; // Milliseconds per frame

// Game state variables
let score = 0;
let dx = 0; // X velocity
let dy = 0; // Y velocity
let snake = [];
let food = { x: 0, y: 0 };
let gameInterval;
let isGameRunning = false;

// Initialize the game
function startGame() {
    if(gameInterval) clearInterval(gameInterval);
    
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    score = 0;
    dx = 1; // Start moving right
    dy = 0;
    scoreElement.innerText = "Score: " + score;
    isGameRunning = true;
    
    createFood();
    
    gameInterval = setInterval(update, gameSpeed);
}

function update() {
    if(isGameOver()) return;

    // Clear screen
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Move Snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head); // Add new head

    // Check if food eaten
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.innerText = "Score: " + score;
        createFood();
    } else {
        snake.pop(); // Remove tail if food not eaten
    }

    // Draw Snake
    ctx.fillStyle = "#2ecc71";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize - 2, gridSize - 2);
    }

    // Draw Food
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function createFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);

    // Ensure food doesn't spawn on snake
    for (let part of snake) {
        if (part.x === food.x && part.y === food.y) {
            createFood();
        }
    }
}

function isGameOver() {
    let gameOver = false;
    
    // Hit walls
    if (snake[0].x < 0 || snake[0].x > tileCount - 1 ||
        snake[0].y < 0 || snake[0].y > tileCount - 1) {
        gameOver = true;
    }

    // Hit self
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            gameOver = true;
        }
    }

    if (gameOver) {
        clearInterval(gameInterval);
        isGameRunning = false;
        ctx.fillStyle = "white";
        ctx.font = "40px Courier New";
        ctx.fillText("Game Over", 60, 200);
    }

    return gameOver;
}

// Keyboard controls
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if(!isGameRunning) return;
    
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -1; dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0; dy = -1;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 1; dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0; dy = 1;
    }
}
