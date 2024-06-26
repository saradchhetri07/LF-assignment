import { assetsManager } from "../classes/AssetsManager";
import { CANVAS_DIMENSIONS } from "../constants/constants";

export function gameCompleted(context: CanvasRenderingContext2D): void {
  context.clearRect(
    0,
    0,
    CANVAS_DIMENSIONS.CANVAS_WIDTH,
    CANVAS_DIMENSIONS.CANVAS_WIDTH
  );

  context.fillStyle = "black";
  context.fillRect(
    0,
    0,
    CANVAS_DIMENSIONS.CANVAS_WIDTH,
    CANVAS_DIMENSIONS.CANVAS_WIDTH
  );

  // Set the font to "Press Start 2P"
  context.font = '20px "Press Start 2P"';
  context.fillStyle = "white"; // Set text color
  context.textAlign = "center"; // Center align the text
  context.textBaseline = "middle"; // Middle align the text
  // ,player.kunaiCount,3 - player.getScrollCount()
  context.fillText(
    `CONGRATULATIONS YOU HAVE COMPLETED ALL THE LEVELS`,
    CANVAS_DIMENSIONS.CANVAS_WIDTH / 2,
    CANVAS_DIMENSIONS.CANVAS_HEIGHT / 2
  );

  const restartButton = document.getElementById(
    "restartId"
  ) as HTMLButtonElement;

  restartButton.style.display = "block";

  restartButton.addEventListener("click", () => {
    window.location.reload();
  });
}
