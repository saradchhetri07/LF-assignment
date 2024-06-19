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
// this.player = new Player(
//   {
//     x: NINJA_CONSTANT.HORIZONTAL_OFFSET,
//     y:
//       CANVAS_DIMENSIONS.CANVAS_HEIGHT -
//       NINJA_CONSTANT.PLAYER_HEIGHT -
//       NINJA_CONSTANT.VERTICAL_OFFSET,
//   },
//   {
//     width: NINJA_SPRITE_IDLE.WIDTH / NINJA_SPRITE_IDLE.COLUMN,
//     height: NINJA_SPRITE_IDLE.HEIGHT / NINJA_SPRITE_IDLE.ROWS,
//   },
//   playerRunImage,
//   NINJA_SPRITE_IDLE.MAX_FRAME
// );

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
      6,
      2,
      "level_1_sublevel_1",
      level_1_Enemy_1_Image,
      enemyHeadImage,
      { x: 8, y: 8 }
    ),

    new Level1Enemy2({ x: 300, y: 500 }, { width: 50, height: 50 }),
  ],

  [
    new Level2Enemy1({ x: 200, y: 500 }, { width: 50, height: 50 }),
    new Level2Enemy2({ x: 300, y: 500 }, { width: 50, height: 50 }),
  ],

  [
    new Level3Enemy1({ x: 200, y: 500 }, { width: 50, height: 50 }),
    new Level3Enemy2({ x: 300, y: 500 }, { width: 50, height: 50 }),
  ],

  [
    new Level3Enemy1({ x: 200, y: 500 }, { width: 50, height: 50 }),
    new Level3Enemy2({ x: 300, y: 500 }, { width: 50, height: 50 }),
  ],
];
