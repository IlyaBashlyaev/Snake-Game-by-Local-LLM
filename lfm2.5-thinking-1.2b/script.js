// snake.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const width = 400;
const height = 400;

let snake = [
    Math.round(Math.random() * 40),
    Math.round(Math.random() * 40)
];
let direction = [1, 0]; // Initial direction: right
let food = {x: 150, y: 150};
let score = 0;
let gameRunning = true;

function draw() {
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(0, 0, width, height);
    drawSnake(snake);
    drawFood(food);
    drawScore(score);
}

function drawSnake(parts) {
    parts.forEach(part => {
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(part.x * 10, part.y * 10, 10, 10);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function update() {
    // const keys = document.documentElement.dataset.keyboard;

    const newHead = {x: snake[0].x + direction[0], y: snake[0].y + direction[1]};
    snake.unshift(newHead);

    // Check collisions
    if (newHead.x < 0 || newHead.x >= width || newHead.y < 0 || newHead.y >= height) {
        gameRunning = false;
        alert('Game Over! You hit the wall.');
        return;
    }

    if (newHead.x === food.x && newHead.y === food.y) {
        score += 10;
        food.x = snake[0].x;
        food.y = snake[0].y;
    } else {
        // Check self collision
        for (let i = 1; i < snake.length; i++) {
            if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
                gameRunning = false;
                alert('Game Over! You hit your own tail.');
                return;
            }
        }
    }

    draw();
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    update();
    draw();
}

window.addEventListener('keydown', e => {
    if (e.code === 'ArrowUp') direction[1] = -1;
    else if (e.code === 'ArrowDown') direction[1] = 1;
    else if (e.code === 'ArrowLeft') direction[0] = -1;
    else if (e.code === 'ArrowRight') direction[0] = 1;
});

// Start game loop
setInterval(gameLoop, 100);