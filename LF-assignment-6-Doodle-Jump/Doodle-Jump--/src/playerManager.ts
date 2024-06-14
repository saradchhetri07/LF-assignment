import { PLAYER } from "./constant";
import { Player, IPlayer } from "./components/Player";

export let player: Player;

/**
 * Initialize the player object.
 * @param x Initial x-coordinate of the player.
 * @param y Initial y-coordinate of the player.
 * @param width Width of the player.
 * @param height Height of the player.
 * @param imageUrl URL of the image for the player.
 */
export function initializePlayer(
  x: number,
  y: number,
  width: number,
  height: number,
  imageUrl: string
): void {
  player = new Player(x, y, width, height, imageUrl);
}

/**
 * Update the player's position and state.
 */
export function updatePlayer(): void {
  player.update();
  // Additional logic can be added here as needed for player updates
}

/**
 * Draw the player on the canvas.
 * @param ctx The canvas rendering context.
 */
export function drawPlayer(ctx: CanvasRenderingContext2D): void {
  player.draw(ctx);
}

/**
 * Move the player to the left.
 */
export function movePlayerLeft(): void {
  player.moveLeft();
}

/**
 * Move the player to the right.
 */
export function movePlayerRight(): void {
  player.moveRight();
}

/**
 * Stop the player's horizontal movement.
 */
export function stopPlayer(): void {
  player.stopMoving();
}

/**
 * Retrieve the player object.
 * @returns The player object.
 */
export function getPlayer(): IPlayer {
  return player;
}

/**
 * Check if the player is jumping.
 * @returns True if the player is jumping, false otherwise.
 */
export function isPlayerJumping(): boolean {
  return player.isJumping;
}

/**
 * Reset the player's initial state.
 */
export function resetPlayer(): void {
  player.x = PLAYER.START_X;
  player.y = PLAYER.START_Y;
  player.velocityY = 0;
  player.isInitial = true;
  // Reset any other player-specific properties as needed
}
