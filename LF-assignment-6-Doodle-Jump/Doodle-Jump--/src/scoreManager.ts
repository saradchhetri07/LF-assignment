import { player } from "./playerManager";

export let score = 0;
let maxScore = 0;
let highScore = localStorage.getItem("highScore")
  ? parseInt(localStorage.getItem("highScore")!)
  : 0;

/**
 * Initialize the score for the game.
 */
export function initializeScore() {
  score = 0;
  maxScore = 0;
}

/**
 * Update the score based on player's position.
 */
export function updateScore() {
  let points = Math.floor(100 * Math.random());
  if (player.velocityY < 0) {
    maxScore += points;
    if (score < maxScore) {
      score = maxScore;
    }
  } else if (player.velocityY >= 0) {
    maxScore -= points;
  }
}

/**
 * Display the current score and high score on the canvas.
 * @param ctx The rendering context of the canvas.
 */
export function displayScore(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "black";
  ctx.font = "36px sans-serif";
  ctx.fillText(`Score: ${score}`, 5, 30);
  ctx.fillText(`High Score: ${highScore}`, 200, 30);
}
