const gameCanvas = document.getElementById('gameCanvas'),
    ctx = gameCanvas.getContext('2d'),
    LEFT_KEY = 37,
    RIGHT_KEY = 39,
    UP_KEY = 38,
    DOWN_KEY = 40;

let foodX, // food's location
    foodY,
    dx = 10, // snake path
    dy = 0,
    changingDirection = false,
    score = 0;

let snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150},
];

document.addEventListener('keydown', changeDirection);

function randomNumber(max, min) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function changeDirection(event) {
    if (changingDirection) return;

    changingDirection = true;

    const keyPressed = event.keyCode;
    if (keyPressed === LEFT_KEY && dx !== 10) {
        dx = -10;
        dy = 0;
    }

    if (keyPressed === RIGHT_KEY && dx !== -10) {
        dx = 10;
        dy = 0;
    }

    if (keyPressed === UP_KEY && dy !== 10) {
        dx = 0;
        dy = -10;
    }

    if (keyPressed === DOWN_KEY && dy !== -10) {
        dx = 0;
        dy = 10;
    }
}

function didGameEnd() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameCanvas.height - 10;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function clearCanvas() {
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#000';

    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}
function createFood() {
    foodX = randomNumber(gameCanvas.width - 10, 0);
    foodY = randomNumber(gameCanvas.width - 10, 0);

    snake.forEach(snakePart => {
        if (snakePart.x === foodX && snakePart.y === foodY) {
            createFood();
        }
    })
}

function advanceSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    snake.unshift(head);
    if (head.x === foodX && head.y === foodY) {
        score += 1;
        document.getElementById('score').innerHTML = score;
        createFood();
    } else {
        snake.pop();
    }
}

function drawSnake() {
    return snake.forEach(drawSnakePart);
}
function drawSnakePart(snakePart) {
    ctx.fillStyle = 'lightgreen';
    ctx.strokeStyle = '#000';

    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'darkred';

    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

function main() {
    if (didGameEnd()) return;

    setTimeout(() => {
        changingDirection = false;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();

        main();
    }, 100);
}

main();
createFood();
