import completedImage from "../assets/Images/background/levelCompleted1.png";
import { Player } from "../classes/player";
import { CANVAS_DIMENSIONS } from "../constants/constants";

/**
 * Handles the level completed state.
 * @param {CanvasRenderingContext2D} context - The drawing context.
 * @param {HTMLCanvasElement} canvas - The canvas element to draw the game on.
 * @param {Function} startNextLevel - The function to start the next level.
 */
export function levelCompleted(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  startNextLevel: Function,
  player: Player
): void {
  context.clearRect(0, 0, canvas.width, canvas.height);
  // Draw a green background
  const levelCompletedImage = new Image();
  levelCompletedImage.src = completedImage;

  context.drawImage(
    levelCompletedImage,
    0,
    0,
    CANVAS_DIMENSIONS.CANVAS_WIDTH,
    CANVAS_DIMENSIONS.CANVAS_HEIGHT
  );

  // Set the font to "Press Start 2P"
  context.font = '20px "Press Start 2P"';
  context.fillStyle = "white"; // Set text color
  context.textAlign = "center"; // Center align the text
  context.textBaseline = "middle"; // Middle align the text
  // ,player.kunaiCount,3 - player.getScrollCount()
  context.fillText(
    `LEAPFROG NINJA HEALTH:  ${player.health}%`,
    CANVAS_DIMENSIONS.CANVAS_WIDTH / 2 - 200,
    CANVAS_DIMENSIONS.CANVAS_HEIGHT / 2 - 100
  );
  context.fillText(
    `Kunai Count:  ${player.kunaiCount}`,
    CANVAS_DIMENSIONS.CANVAS_WIDTH / 2 - 200,
    CANVAS_DIMENSIONS.CANVAS_HEIGHT / 2
  );

  context.fillText(
    `Scroll to collect:  ${4 - player.getScrollCount()}`,
    CANVAS_DIMENSIONS.CANVAS_WIDTH / 2 - 200,
    CANVAS_DIMENSIONS.CANVAS_HEIGHT / 2 + 100
  );

  // Show the next level button
  const nextLevelButton = document.getElementById(
    "levelCompletedID"
  ) as HTMLButtonElement;
  nextLevelButton.style.display = "block";

  // Attach the click event listener to start the next level
  nextLevelButton.onclick = () => {
    nextLevelButton.style.display = "none"; // Hide the button after clicking
    startNextLevel();
  };
}
