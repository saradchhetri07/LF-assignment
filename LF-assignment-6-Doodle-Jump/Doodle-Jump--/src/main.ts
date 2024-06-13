import "./style.css";
import { DIMENSIONS, PLAYER, PLATFORM } from "./constant";
import bg from "./assets/background.png";
import PlayerImage from "./assets/Player.png";
import platformImage from "./assets/platform.png";
import { Player, IPlayer } from "./components/Player";
import { Platform, IPlatform } from "./components/Platform";
import { getRandomInt } from "./utils/common";
import jumpSoundUrl from "./assets/jump.mp3";
import fallSoundUrl from "./assets/fall.mp3";

const canvas = document.querySelector<HTMLCanvasElement>("#board")!;

const ctx = canvas.getContext("2d")!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

var background = new Image();
background.src = bg;

const startButton = document.getElementById("startButton") as HTMLElement;
const jumpSound = new Audio(jumpSoundUrl);
const fallSound = new Audio(fallSoundUrl);
let isPaused = false;

let score = 0;
let maxScore = 0;
let highScore = localStorage.getItem("highScore")
  ? parseInt(localStorage.getItem("highScore")!)
  : 0;

let gameStarted = false;
let gameOver = false;

let player: IPlayer;

function initializeGame() {
  player = new Player(
    PLAYER.START_X,
    PLAYER.START_Y,
    PLAYER.WIDTH,
    PLAYER.HEIGHT,
    PlayerImage
  );

  platforms.length = 0;
  createInitialPlatforms();
  score = 0;
  maxScore = 0;
  gameOver = false;
}

// Create initial platforms
const platforms: IPlatform[] = [];
const MAX_VERTICAL_GAP = 90; // Maximum vertical gap that the player can jump
const MAX_HORIZONTAL_GAP = 150; // Maximum horizontal gap that the player can jump

function createInitialPlatforms() {
  const initialY = DIMENSIONS.CANVAS_HEIGHT - PLAYER.HEIGHT;
  const initialX = DIMENSIONS.CANVAS_WIDTH / 2 - PLAYER.WIDTH / 2;

  let platform = new Platform(initialX, initialY, platformImage);
  platforms.push(platform);
  for (let i = 1; i < 10; i++) {
    let randomX =
      initialX + getRandomInt(-MAX_HORIZONTAL_GAP, MAX_HORIZONTAL_GAP);
    randomX = Math.max(
      0,
      Math.min(randomX, DIMENSIONS.CANVAS_WIDTH - PLATFORM.WIDTH)
    );
    let platform = new Platform(
      randomX,
      initialY - (PLATFORM.HEIGHT + PLATFORM.MIN_DISTANCE) * i,
      platformImage
    );
    platforms.push(platform);
  }
}

function newPlatform() {
  const lastPlatformY = platforms[platforms.length - 1].y;
  let randomX =
    platforms[platforms.length - 1].x +
    getRandomInt(-MAX_HORIZONTAL_GAP, MAX_HORIZONTAL_GAP);
  randomX = Math.max(
    0,
    Math.min(randomX, DIMENSIONS.CANVAS_WIDTH - PLATFORM.WIDTH)
  );
  let platform = new Platform(
    randomX,
    lastPlatformY -
      PLATFORM.HEIGHT -
      PLATFORM.MIN_DISTANCE -
      getRandomInt(50, MAX_VERTICAL_GAP),
    platformImage
  );
  platforms.push(platform);
}

function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  // Draw background image
  ctx.drawImage(
    background,
    0,
    0,
    DIMENSIONS.CANVAS_WIDTH,
    DIMENSIONS.CANVAS_HEIGHT
  );

  // Draw main player image
  player.update();
  player.draw(ctx);

  if (!gameStarted) {
    // Draw the start button background
    ctx.drawImage(
      background,
      0,
      0,
      DIMENSIONS.CANVAS_WIDTH,
      DIMENSIONS.CANVAS_HEIGHT
    );
    return; // Do not proceed with the game drawing logic
  }
  if (player.velocityY < 0) {
    fallSound.play();

    if (player.y < DIMENSIONS.CANVAS_HEIGHT) {
      fallSound.pause();
    }
  }
  platforms.forEach((platform) => {
    if (score >= 300) {
      platform.isMoving = true;
      platform.draw(ctx, score);
    } else {
      platform.isMoving = false;
      platform.draw(ctx, score);
    }
    if (player.velocityY < 0 && player.y < (DIMENSIONS.CANVAS_HEIGHT * 3) / 4) {
      platform.y -= player.velocityY; // Sliding the platform down
    }

    // Collision detection
    if (
      player.y + player.height > platform.y &&
      player.y + player.height < platform.y + platform.height &&
      player.x + player.width > platform.x &&
      player.x < platform.x + platform.width &&
      player.velocityY > 0
    ) {
      player.velocityY = player.bounceStrength; // Automatically bounce
      player.isJumping = false;
      jumpSound.play();
    }
  });

  // Clear platforms and add new ones
  while (platforms.length > 0 && platforms[0].y >= DIMENSIONS.CANVAS_HEIGHT) {
    player.isInitial = false;
    updateScore();
    platforms.shift();
    newPlatform();
  }

  // Update score
  ctx.fillStyle = "black";
  ctx.font = "36px sans-serif";
  ctx.fillText(`Score: ${score}`, 5, 30);
  ctx.fillText(`High Score: ${highScore}`, 200, 30);

  // Check if the player falls below the canvas
  if (player.y >= DIMENSIONS.CANVAS_HEIGHT - 20) {
    gameOver = true;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore.toString());
    }
  }

  if (!gameOver) {
    if (gameStarted) {
      requestAnimationFrame(draw);
    } else {
      ctx.drawImage(
        background,
        0,
        0,
        DIMENSIONS.CANVAS_WIDTH,
        DIMENSIONS.CANVAS_HEIGHT
      );
    }
  } else {
    // Draw game over text on top of the current canvas
    ctx.fillStyle = "black";
    ctx.font = "48px sans-serif";
    ctx.fillText(
      "Game Over",
      DIMENSIONS.CANVAS_WIDTH / 2 - 120,
      DIMENSIONS.CANVAS_HEIGHT / 2
    );
    ctx.font = "24px sans-serif";
    ctx.fillText(
      "Press 'R' to Restart",
      DIMENSIONS.CANVAS_WIDTH / 2 - 90,
      DIMENSIONS.CANVAS_HEIGHT / 2 + 40
    );
  }
}

function updateScore(): void {
  let points = Math.floor(50 * Math.random());
  if (player.velocityY < 0) {
    maxScore += points;
    if (score < maxScore) {
      score = maxScore;
    }
  } else if (player.velocityY >= 0) {
    maxScore -= points;
  }
}

initializeGame();

startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  gameStarted = true;
  draw();
});

// Handle key events
window.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "ArrowLeft") {
    player.moveLeft();
  } else if (event.key === "ArrowRight") {
    player.moveRight();
  } else if ((event.key === "r" || event.key === "R") && gameOver) {
    initializeGame();
    gameStarted = true;
    draw();
  } else if (event.key === " ") {
    isPaused = !isPaused;
  } else if ((event.key === "s" || event.key === "S") && !gameStarted) {
    gameStarted = true;
    draw();
  }
});

// Initial draw to display the start screen
draw();
