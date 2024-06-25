import { CANVAS_DIMENSIONS } from "../constants/constants";
import { assetsManager } from "./AssetsManager";

export function gameOverScreen(ctx: CanvasRenderingContext2D): void {
  console.log("came to game over screen");

  ctx.clearRect(
    0,
    0,
    CANVAS_DIMENSIONS.CANVAS_WIDTH,
    CANVAS_DIMENSIONS.CANVAS_HEIGHT
  );

  ctx.drawImage(
    assetsManager.sprites.GAMEOVERSCREEN,
    0,
    0,
    CANVAS_DIMENSIONS.CANVAS_WIDTH,
    CANVAS_DIMENSIONS.CANVAS_HEIGHT
  );
}
