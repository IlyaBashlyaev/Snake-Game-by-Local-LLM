// --- Setup Canvas and Context ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreBoard = document.getElementById('scoreBoard');

// --- Game Constants ---
const gridSize = 20; // Size of each block (snake segment and food)
const tileCount = canvas.width / gridSize; // 20x20 grid

// --- Game State Variables ---
let snake = [
    { x: 100, y: 100 }, // Initial snake position (center)
    { x: 150, y: 100 }
];
let food = { x: 120, y: 120 };
let dx = 1; // Velocity in x direction (1 = right, -1 = left, 0 = none)
let dy = 0; // Velocity in y direction
let score = 0;
let gameLoopInterval;
let isGameOver = false;

// --- Initialization Functions ---

function initializeGame() {
    // Reset state for a new game
    snake = [
        { x: 100, y: 100 },
        { x: 100, y: 101 }
    ];
    dx = 1;
    dy = 0;
    score = 0;
    isGameOver = false;
    scoreBoard.textContent = `Score: ${score}`;
    
    placeFood();
    
    // Start the game loop
    startGameLoop();
}

function placeFood() {
    // Place food randomly on the grid, ensuring it doesn't spawn on the snake
    let newFoodX, newFoodY;
    do {
        newFoodX = Math.floor(Math.random() * tileCount);
        newFoodY = Math.floor(Math.random() * tileCount);
    } while (isFoodOnSnake(newFoodX, newFoodY));
    
    food.x = newFoodX * gridSize;
    food.y = newFoodY * gridSize;
}

function isFoodOnSnake(x, y) {
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === x && snake[i].y === y) {
            return true;
        }
    }
    return false;
}

// --- Drawing Functions ---

function draw() {
    // 1. Clear the canvas
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw the food (Red)
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // 3. Draw the snake
    ctx.fillStyle = 'lime';
    snake.forEach((segment, index) => {
        // Draw the head slightly differently or just fill the block
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

// --- Game Logic Functions ---

function update() {
    if (isGameOver) return;

    // 1. Calculate the new head position
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    // 2. Add the new head to the front of the snake
    snake.unshift(head);

    // 3. Check for food collision
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreBoard.textContent = `Score: ${score}`;
        placeFood(); // Place new food
        // Don't remove the tail (snake grows)
    } else {
        // If no food, remove the tail (snake moves)
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];

    // 1. Wall collision
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        endGame("Hit the wall!");
        return;
    }

    // 2. Self collision (Check if head overlaps with the rest of the body)
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame("Hit yourself!");
            return;
        }
    }
}

function endGame(reason) {
    isGameOver = true;
    clearInterval(gameLoopInterval);
    console.log(`Game Over! Reason: ${reason}. Final Score: ${score}`);
    alert(`Game Over! ${reason} \nFinal Score: ${score}`);
    // Optionally restart the game here
}

// --- Main Game Loop ---

function startGameLoop() {
    // Run the update and drawing functions every 100 milliseconds
    gameLoopInterval = setInterval(() => {
        update();
        checkCollision();
        draw();
    }, 100); 
}

// --- Input Handling ---

document.addEventListener('keydown', (event) => {
    // Prevent the snake from immediately reversing direction (e.g., pressing Left then Right instantly)
    switch (event.key) {
        case 'ArrowUp':
            if (dy === 0) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
            if (dy === 0) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
            if (dx === 0) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx === 0) { dx = 1; dy = 0; }
            break;
    }
});


// Start the game when the script loads
initializeGame();