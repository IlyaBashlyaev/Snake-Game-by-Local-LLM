// --- Game Constants and State ---
const BOARD_SIZE = 20; // 20x20 grid
const TILE_SIZE = 20; // 20 pixels per cell
const GAME_BOARD = document.getElementById('game-board');
const SCORE_DISPLAY = document.getElementById('score');

let snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }]; // Initial snake position (head is always the first element)
let food = {}; // Will store {x, y}
let dx = 1;    // Current x direction (1 = right)
let dy = 0;    // Current y direction (0 = no vertical movement)
let score = 0;
let gameInterval = setInterval(gameLoop, 100);

// --- Initialization ---
// 1. Create the grid cells visually in the HTML
function initializeBoard() {
    GAME_BOARD.innerHTML = '';
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = `cell-${Math.floor(i / BOARD_SIZE)}-${i % BOARD_SIZE}`;
        GAME_BOARD.appendChild(cell);
    }
    placeFood();
}

// 2. Function to place food randomly, ensuring it doesn't spawn on the snake
function placeFood() {
    let newFoodPosition;
    do {
        // Generate random coordinates within the board boundaries
        newFoodPosition = {
            x: Math.floor(Math.random() * BOARD_SIZE),
            y: Math.floor(Math.random() * BOARD_SIZE)
        };
    } while (snake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y));

    food = newFoodPosition;
}


// --- Core Game Functions ---

// 1. Updates the positions of all graphical elements (snake and food)
function render() {
    // Clear the board visually
    document.querySelectorAll('.cell').forEach(cell => {
        cell.className = 'cell'; // Reset all cells
    });

    // Draw the snake
    snake.forEach((segment, index) => {
        const cell = document.getElementById(`cell-${segment.y}-${segment.x}`);
        if (cell) {
            cell.classList.add('snake');
        }
    });

    // Draw the food
    const foodCell = document.getElementById(`cell-${food.y}-${food.x}`);
    if (foodCell) {
        foodCell.classList.add('food');
    }

    // Update score display
    SCORE_DISPLAY.textContent = score;
}


// 2. Moves the snake's head based on the current direction (dx, dy)
function moveSnake() {
    // 1. Create the new head position
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // 2. Add the new head to the front of the snake array
    snake.unshift(head);

    // 3. Check for food consumption
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        placeFood(); // Place new food
        // DO NOT pop the tail, allowing the snake to grow
        
    } else {
        // If no food eaten, remove the tail segment
        snake.pop();
    }
}

// 3. Checks for game-ending collisions
function checkCollision() {
    const head = snake[0];

    // 1. Wall collision check
    const hitWall = head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE;
    
    // 2. Self-collision check (checking if the head coordinates match any body segment)
    const hitSelf = snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);

    if (hitWall || hitSelf) {
        gameOver();
        return true; // Collision detected
    }
    return false; // Game continues
}

// 4. The main game loop
function gameLoop() {
    // 1. Move the snake
    moveSnake();

    // 2. Check for collisions
    if (checkCollision()) {
        clearInterval(gameInterval);
        alert(`Game Over! Your final score is: ${score}`);
        return;
    }

    // 3. Redraw everything
    render();
}

// --- Input Handling ---
document.addEventListener('keydown', e => {
    // Prevent the snake from reversing immediately
    if (e.key === 'ArrowLeft' && dx !== 1) {
        dx = -1;
        dy = 0;
    } else if (e.key === 'ArrowRight' && dx !== -1) {
        dx = 1;
        dy = 0;
    } else if (e.key === 'ArrowUp' && dy !== 1) {
        dx = 0;
        dy = -1;
    } else if (e.key === 'ArrowDown' && dy !== -1) {
        dx = 0;
        dy = 1;
    }
});


// --- Game Management ---
function gameOver() {
    // Stop the interval and prevent further calls to gameLoop
    clearInterval(gameInterval);
    document.getElementById('score-board').innerHTML = 'Game Over! Press F5 to restart.';
}

// Start the game when the script loads
initializeBoard();
render();