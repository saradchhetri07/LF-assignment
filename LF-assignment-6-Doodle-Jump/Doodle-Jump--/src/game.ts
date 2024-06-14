import "./style.css";
import { DIMENSIONS, PLAYER } from "./constant";
import { ctx } from "./canvas";
import { fallSound } from "./sound";
import PlayerImage from "./assets/Player.png";
import {
  initializePlayer,
  player,
  updatePlayer,
  drawPlayer,
} from "./playerManager";
import {
  initializePlatforms,
  drawPlatforms,
  updatePlatforms,
  checkCollisions,
} from "./platformManager";
import { handleKeyDown } from "./inputHandler";
import { initializeScore, updateScore, displayScore } from "./scoreManager";
import bg from "./assets/background.png";
import {
  getGameOver,
  setGameOver,
  getGameStarted,
  setGameStarted,
  resetGameState,
} from "./state";

const startButton = document.getElementById("startButton") as HTMLElement;

const background = new Image();
background.src = bg;

function initializeGame() {
  resetGameState();
  initializePlayer(
    PLAYER.START_X,
    PLAYER.START_Y,
    PLAYER.WIDTH,
    PLAYER.HEIGHT,
    PlayerImage
  );
  initializePlatforms();
  initializeScore();
}

/**
 * Draws the game frame by frame.
 */
function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.drawImage(
    background,
    0,
    0,
    DIMENSIONS.CANVAS_WIDTH,
    DIMENSIONS.CANVAS_HEIGHT
  );

  updatePlayer();
  drawPlayer(ctx);

  if (!getGameStarted()) {
    ctx.drawImage(
      background,
      0,
      0,
      DIMENSIONS.CANVAS_WIDTH,
      DIMENSIONS.CANVAS_HEIGHT
    );
    return;
  }

  if (player.velocityY < 0) {
    fallSound.play();
    if (player.y < DIMENSIONS.CANVAS_HEIGHT) {
      fallSound.pause();
    }
  }

  updatePlatforms();
  drawPlatforms(ctx);
  checkCollisions();

  displayScore(ctx);

  if (player.y >= DIMENSIONS.CANVAS_HEIGHT - 20) {
    setGameOver(true);
    updateScore();
  }

  if (!getGameOver()) {
    if (getGameStarted()) {
      requestAnimationFrame(draw);
    }
  } else {
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

export { initializeGame, draw };

initializeGame();
startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  setGameStarted(true);
  draw();
});

window.addEventListener("keydown", handleKeyDown);
