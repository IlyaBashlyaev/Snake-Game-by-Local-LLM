const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const finalScoreElement = document.getElementById("finalScore");
const gameOverElement = document.getElementById("gameOver");
const restartBtn = document.getElementById("restartBtn");

// Game variables
let snake = [{ x: 100, y: 100 }];
let food = { x: 200, y: 200 };
let direction = { x: 0, y: 0 };
let score = 0;
let gameSpeed = 100; // ms
let gameInterval;

// Initialize game
function initGame() {
    snake = [{ x: 100, y: 100 }];
    direction = { x: 0, y: 0 };
    score = 0;
    scoreElement.textContent = score;
    placeFood();
    startGame();
}

// Place food randomly
function placeFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width - 20)) + 10,
        y: Math.floor(Math.random() * (canvas.height - 20)) + 10
    };
}

// Draw snake and food
function draw() {
    // Clear canvas
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "#4CAF50" : "#8BC34A";
        ctx.fillRect(segment.x, segment.y, 20, 20);
    });

    // Draw food
    ctx.fillStyle = "#F44336";
    ctx.fillRect(food.x, food.y, 20, 20);
}

// Game loop
function gameLoop() {
    draw();
    moveSnake();
    checkCollision();
    requestAnimationFrame(gameLoop);
}

// Move snake
function moveSnake() {
    const head = { x: snake[0].x + direction.x * 20, y: snake[0].y + direction.y * 20 };

    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = score;
        placeFood();
    } else {
        snake.pop(); // Remove tail if no food eaten
    }

    snake.unshift(head); // Add new head
}

// Check collision (wall or self)
function checkCollision() {
    const head = snake[0];

    // Wall collision
    if (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height
    ) {
        gameOver();
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

// Game over
function gameOver() {
    clearInterval(gameLoop);
    finalScoreElement.textContent = score;
    gameOverElement.style.display = "block";
}

// Start game
function startGame() {
    gameInterval = setInterval(() => {
        gameLoop();
    }, gameSpeed);
}

// Keyboard controls
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (direction.y !== 1) direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (direction.y !== -1) direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x !== 1) direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x !== -1) direction = { x: 1, y: 0 };
            break;
    }
});

// Restart game
restartBtn.addEventListener("click", initGame);

// Start game
initGame();