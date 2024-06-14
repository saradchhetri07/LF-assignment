import { player } from "./playerManager";
import { initializeGame, draw } from "./game";
import {
  getGameOver,
  getGameStarted,
  setGameStarted,
  togglePause,
} from "./state";

/**
 * Handle keydown events for player movement and game controls.
 * @param event The keyboard event.
 */
export function handleKeyDown(event: KeyboardEvent) {
  if (event.key === "ArrowLeft") {
    player.moveLeft();
  } else if (event.key === "ArrowRight") {
    player.moveRight();
  } else if ((event.key === "r" || event.key === "R") && getGameOver()) {
    initializeGame();
    setGameStarted(true);
    draw();
  } else if (event.key === " ") {
    togglePause();
  } else if ((event.key === "s" || event.key === "S") && !getGameStarted()) {
    setGameStarted(true);
    draw();
  }
}
