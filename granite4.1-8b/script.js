const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{x: 180, y: 180}];
let direction = {x: 10, y: 0}; // initial movement to the right
let food = {x: Math.round(Math.random() * 40) * 10, y: Math.round(Math.random() * 40) * 10};
let score = 0;

function drawSnake(snake) {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

function moveSnake() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    if (head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        // Game over condition
        alert('Game Over!');
        location.reload();
    }
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood();
    } else {
        snake.pop(); // Remove tail segment
    }
}

function generateFood() {
    let newFood = {x: Math.round(Math.random() * 40) * 10, y: Math.round(Math.random() * 40) * 10};
    /* Ensure food does not spawn on top of the snake
    while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        newFood = {x: Math.round(Math.random() * 40) * 10, y: Math.round(Math.random() * 40) * 10};
    } */
    return newFood;
}

function changeDirection(event) {
    event.preventDefault;
    const key = event.key;
    console.log(key)

    switch (key) {
        case 'ArrowLeft':
            if (direction.x !== 10) direction = {x: -10, y: 0};
            break;
        case 'ArrowUp':
            if (direction.y !== 10) direction = {x: 0, y: -10};
            break;
        case 'ArrowRight':
            if (direction.x !== -10) direction = {x: 10, y: 0};
            break;
        case 'ArrowDown':
            if (direction.y !== -10) direction = {x: 0, y: 10};
            break;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake(snake);
    drawFood();
}

document.addEventListener('keydown', changeDirection);

// Initialize the game
snake[0].x = Math.round(canvas.width / 2);
snake[0].y = Math.round(canvas.height / 2);
food = generateFood();

setInterval(gameLoop, 100);