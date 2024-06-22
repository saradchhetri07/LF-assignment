import { BaseEnemy } from "../classes/enemy";
import {
  Level1Enemy1,
  Level1Enemy2,
  Level2Enemy1,
  Level2Enemy2,
  Level3Enemy1,
  Level3Enemy2,
} from "../classes/levelEnemy";
import {
  CANVAS_DIMENSIONS,
  LEVEL1_ENEMY,
  NINJA_CONSTANT,
} from "../constants/constants";
import level_1_Enemy_1_Image from "../assets/Images/enemy/enemyIdle.png";
import enemyHeadImage from "../assets/Images/enemy/enemyIcon.png";

import level_2_Enemy_1_Image from "../assets/Images/enemy/ork2Idle.png";
import level_2_Enemy_head from "../assets/Images/enemy/orkIcon.png";

export const makeLevelEnemies = [
  [
    //level1 sublevel1 enemy
    new BaseEnemy(
      {
        x: CANVAS_DIMENSIONS.CANVAS_WIDTH - NINJA_CONSTANT.HORIZONTAL_OFFSET,
        y:
          CANVAS_DIMENSIONS.CANVAS_HEIGHT -
          NINJA_CONSTANT.PLAYER_HEIGHT -
          NINJA_CONSTANT.VERTICAL_OFFSET,
      },
      {
        width: LEVEL1_ENEMY.WIDTH / LEVEL1_ENEMY.COLUMN,
        height: LEVEL1_ENEMY.HEIGHT / LEVEL1_ENEMY.ROWS,
      },
      100,
      4,
      2,
      "level_1_sublevel_1",
      level_1_Enemy_1_Image,
      enemyHeadImage,
      { x: 8, y: 8 }
    ),
  ],

  [
    new BaseEnemy(
      {
        x: CANVAS_DIMENSIONS.CANVAS_WIDTH - NINJA_CONSTANT.HORIZONTAL_OFFSET,
        y:
          CANVAS_DIMENSIONS.CANVAS_HEIGHT -
          NINJA_CONSTANT.PLAYER_HEIGHT -
          NINJA_CONSTANT.VERTICAL_OFFSET,
      },
      {
        width: LEVEL1_ENEMY.WIDTH / LEVEL1_ENEMY.COLUMN,
        height: LEVEL1_ENEMY.HEIGHT / LEVEL1_ENEMY.ROWS,
      },
      100,
      8,
      2,
      "level_2_Sublevel_1",
      level_2_Enemy_1_Image,
      level_2_Enemy_head,
      { x: 4, y: 5 }
    ),
  ],
];
