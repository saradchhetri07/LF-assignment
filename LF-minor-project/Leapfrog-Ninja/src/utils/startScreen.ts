import { assetsManager } from "../classes/AssetsManager";
import { CANVAS_DIMENSIONS } from "../constants/constants";

export const drawStartScreen = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(
    0,
    0,
    CANVAS_DIMENSIONS.CANVAS_WIDTH,
    CANVAS_DIMENSIONS.CANVAS_HEIGHT
  );
  ctx.drawImage(
    assetsManager.sprites.STARTSCREEN,
    0,
    0,
    CANVAS_DIMENSIONS.CANVAS_WIDTH,
    CANVAS_DIMENSIONS.CANVAS_HEIGHT
  );
};
