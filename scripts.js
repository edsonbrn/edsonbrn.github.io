const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

class SnakeLength {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}


let speed = 8;
let tileCount= 20
let tileSize = canvas.width / tileCount - 2
let headX = 10;
let headY = 10;
const snakeLength = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

const snakeGame = () => {


    snakePosition();
    let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();
    drawApple();
    drawSnake();
    checkAppleCollision()
    drawScore();

    if(score >= 10){
        speed = 10;
    }
    if(score >= 15){
        speed = 15
    }

    setTimeout(snakeGame, 1000 / speed)
}

const isGameOver = () => {
    let gameOver = false;

    if(xVelocity === 0 && yVelocity === 0){
        gameOver = false;
        return
    }



    if(headX < 0){
        gameOver = true
    }
    else if(headX === tileCount){
        gameOver = true;
    }
    else if(headY < 0){
        gameOver = true;
    }
    else if (headY === tileCount){
        gameOver = true;
    }
    
    for(let i = 0; i < snakeLength.length; i++){
        let part = snakeLength[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break
        }
    }



    if(gameOver){
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText("Game Over!", canvas.width/6.5, canvas.height/2)
    }

    return gameOver;
}


const drawScore = () => {
    ctx.fillStyle = "white"; 
    ctx.font = "12px Arial";
    ctx.fillText("Score " + score, canvas.width - 65, 16)
}


const clearScreen = () => {
    ctx.fillStyle = "#14323d";
    ctx.fillRect(0, 0,canvas.clientWidth, canvas.height)
}

const drawSnake = () => {
    ctx.fillStyle = "#ffea00";
    for(let i = 0; i < snakeLength.length; i++){
        let part = snakeLength[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize,
        tileSize)
    }
    snakeLength.push(new SnakeLength(headX, headY))

    while(snakeLength.length > tailLength){
        snakeLength.shift();
    }





    ctx.fillStyle = "#ff6a00"
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize,
    tileSize)
}

const drawApple = () => {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, 
    tileSize)
}

const checkAppleCollision = () => {
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount)
        appleY = Math.floor(Math.random() * tileCount)
        tailLength++;
        score++;
    }
}


const snakePosition = () => {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}



document.body.addEventListener("keydown", keyDown = (event) => {
    if(event.code == "ArrowUp") {
        if(yVelocity == 1){
            return;
        }
        yVelocity = -1;
        xVelocity = 0;
    }
    if(event.code == "ArrowDown") {
        if(yVelocity == -1){
            return;
        }
        yVelocity = 1;
        xVelocity = 0;
    }
    if(event.code == "ArrowLeft") {
        if(xVelocity == 1){
            return;
        }
        yVelocity = 0;
        xVelocity = -1;
    }
    if(event.code == "ArrowRight") {
        if(xVelocity == -1){
            return;
        }
        yVelocity = 0;
        xVelocity = 1;
    }
}) 


snakeGame();