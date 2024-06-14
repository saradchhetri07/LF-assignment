let gameOver = false;
let gameStarted = false;
let isPaused = false;

export function getGameOver() {
  return gameOver;
}

export function setGameOver(value: boolean) {
  gameOver = value;
}

export function getGameStarted() {
  return gameStarted;
}

export function setGameStarted(value: boolean) {
  gameStarted = value;
}

export function getIsPaused() {
  return isPaused;
}

export function setIsPaused(value: boolean) {
  isPaused = value;
}

/**
 * Reset the game state variables.
 */
export function resetGameState() {
  gameOver = false;
  gameStarted = false;
  isPaused = false;
}

/**
 * Toggle the game paused state.
 */
export function togglePause() {
  isPaused = !isPaused;
}
