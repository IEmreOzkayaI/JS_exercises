const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high_score");
const playBoard = document.querySelector(".play_board");
const controls = document.querySelectorAll(".controls i");
const snakeHead = document.querySelector(".play_board .snake");

let gameOver = false;
let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let snakeBody = [];
let velocityX = 0,
  velocityY = 0;
let setIntervalId;
let score = 0;
let angular = 0;
let highScore = localStorage.getItem("high_score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;
const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};
const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("Game Over");
  location.reload();
};

const changeDirection = (e) => {
  if (e.key === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
    angular = 270;
    console.log(angular);
  } else if (e.key === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
    angular = 90;
  } else if (e.key === "ArrowUp" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
    angular=180;
  } else if (e.key === "ArrowDown" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
    angular=0;
  }
};

controls.forEach((key) => {
  key.addEventListener("click", () =>
    changeDirection({ key: key.dataset.key })
  );
});

const initGame = () => {
  if (gameOver) return handleGameOver();
  let htmlMarkup = `<div class="food" style="grid-area:${foodY}/${foodX}"></div></div> `;
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
    score++;
    highScore = Math.max(score, highScore);
    localStorage.setItem("high_score", highScore);
    scoreElement.innerText = `Score: ${score}`;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];
  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }
  htmlMarkup += `<div class="snake" style="grid-area:${snakeBody[0][1]}/${snakeBody[0][0]};transform:rotate(${angular}deg)"></div> `;

  for (let i = 1; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="snake-body" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]};transform:rotate(${angular-90}deg)"></div> `;
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }

  playBoard.innerHTML = htmlMarkup;
};
changeFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keydown", changeDirection);
