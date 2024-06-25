import { assetsManager } from "../classes/AssetsManager";
import { CANVAS_DIMENSIONS } from "../constants/constants";

export function instruction(context: CanvasRenderingContext2D): void {
  context.drawImage(
    assetsManager.sprites.CONTROLSCREEN,
    0,
    0,
    CANVAS_DIMENSIONS.CANVAS_WIDTH,
    CANVAS_DIMENSIONS.CANVAS_HEIGHT
  );

  // Set the font to "Press Start 2P"
  context.font = '15px "Press Start 2P"';
  context.fillStyle = "white"; // Set text color
  context.textAlign = "center"; // Center align the text
  context.textBaseline = "middle"; // Middle align the text
  // ,player.kunaiCount,3 - player.getScrollCount()
  context.fillText(
    `WELCOME TO MULTIPLAYER MODE`,
    CANVAS_DIMENSIONS.CANVAS_WIDTH / 2,
    50
  );

  context.fillText(
    `PLAYER 1: LEFT ARROW-->MOVE LEFT RIGHT ARROW->MOVE RIGHT `,
    CANVAS_DIMENSIONS.CANVAS_WIDTH / 2,
    100
  );
  context.fillText(
    `PLAYER 1: UP ARROW-->JUMP `,
    CANVAS_DIMENSIONS.CANVAS_WIDTH / 2,
    150
  );

  context.fillText(
    `PLAYER 1: T-->DRINK HEALTH `,
    CANVAS_DIMENSIONS.CANVAS_WIDTH / 2,
    200
  );

  context.fillText(
    `PLAYER 1: A-->ATTACK S-->THROWWEAPON P-->PAUSE`,
    CANVAS_DIMENSIONS.CANVAS_WIDTH / 2,
    250
  );

  context.fillText(
    `PLAYER 2: J-->MOVELEFT  L-->MOVERIGHT`,
    CANVAS_DIMENSIONS.CANVAS_WIDTH / 2,
    300
  );

  context.fillText(
    `PLAYER 2: N-->ATTACK  M-->THROWWEAPON`,
    CANVAS_DIMENSIONS.CANVAS_WIDTH / 2,
    350
  );
}
