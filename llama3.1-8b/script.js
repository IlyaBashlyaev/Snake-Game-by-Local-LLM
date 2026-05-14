// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set up some constants
const gridSize = 20; // Grid size (cells)
const blockSize = 20; // Block size (pixels)
const speed = 100; // Speed of the game (ms)

// Initialize snake and apple positions
let snakeX = [Math.floor(Math.random() * (canvas.width / blockSize))];
let snakeY = [Math.floor(Math.random() * (canvas.height / blockSize))];
let appleX = Math.floor(Math.random() * (canvas.width / blockSize));
let appleY = Math.floor(Math.random() * (canvas.height / blockSize));

// Draw the game board
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < canvas.width; x += blockSize) {
        for (let y = 0; y < canvas.height; y += blockSize) {
            // Draw grid lines
            ctx.strokeStyle = 'gray';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();

            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }
}

// Draw the snake and apple
function drawGame() {
    // Clear previous game state
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    drawBoard();

    // Draw snake body
    let snakeBody = [];
    for (let i = 0; i < snakeX.length; i++) {
        let x = snakeX[i];
        let y = snakeY[i];
        ctx.fillStyle = '#00698f';
        ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
        snakeBody.push({x: x, y: y});
    }

    // Draw apple
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(appleX * blockSize + (blockSize / 2), appleY * blockSize + (blockSize / 2), blockSize / 4, 0, Math.PI * 2);
    ctx.fill();

    // Update snake position
    if (snakeX.length > 1) {
        for (let i = snakeX.length - 1; i > 0; i--) {
            snakeX[i] = snakeX[i-1];
            snakeY[i] = snakeY[i-1];
        }
    }

    // Move the head of the snake
    snakeX[snakeX.length - 1] += Math.floor(Math.random() * (blockSize / speed));
    snakeY[snakeX.length - 1] += Math.floor(Math.random() * (blockSize / speed));

    // Check for collision with walls or self
    if ((snakeX[snakeX.length - 1] < 0 || snakeX[snakeX.length - 1] >= canvas.width / blockSize) ||
        (snakeY[snakeY.length - 1] < 0 || snakeY[snakeY.length - 1] >= canvas.height / blockSize)) {
        alert('Game Over!');
        location.reload();
    }

    // Check for collision with apple
    if ((snakeX[snakeX.length - 1] === appleX && snakeY[snakeX.length - 1] === appleY) ||
        (Math.abs(snakeX[snakeX.length - 1] - appleX) <= blockSize / speed &&
         Math.abs(snakeY[snakeY.length - 1] - appleY) <= blockSize / speed)) {
        // Update snake position
        snakeX.push(appleX);
        snakeY.push(appleY);

        // Generate new apple position
        do {
            appleX = Math.floor(Math.random() * (canvas.width / blockSize));
            appleY = Math.floor(Math.random() * (canvas.height / blockSize));
        } while ((snakeX.includes(appleX) && snakeY.includes(appleY)) || (Math.abs(appleX - snakeX[snakeX.length - 1]) <= blockSize &&
                 Math.abs(appleY - snakeY[snakeX.length - 1]) <= blockSize));
    }
}

// Set up the game loop
setInterval(drawGame, speed);
drawGame();