const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };
newHead = { x: -1, y: -1 };

let food = {
    x: Math.floor(Math.random() * 30) * box,
    y: Math.floor(Math.random() * 20) * box
};

let score = 0;
let snakeX = 0;
let snakeY = 0;

document.addEventListener('keydown', direction);

let d;

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function draw(countCoords = true) {
    if (snakeX < 0 || snakeY < 0 || snakeX > canvas.width - box || snakeY > canvas.height - box || collision(newHead, snake.slice(1))) {
        clearInterval(game);
        alert('Game Over');
        location.reload();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    snakeX = snake[0].x;
    snakeY = snake[0].y;

    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 30) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    newHead = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead);
    document.getElementById('score').innerHTML = score;
}

let game = setInterval(draw, 100);