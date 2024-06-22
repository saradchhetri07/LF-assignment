import completedImage from "../assets/Images/background/levelCompleted1.png";
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
  startNextLevel: Function
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
