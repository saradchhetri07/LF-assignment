import { assetsManager } from "./../classes/AssetsManager";
import { BaseEnemy } from "../classes/enemy";
import enemyImage from "../assets/Images/enemy/enemyIdle.png";
import enemyHeadImage from "../assets/Images/enemy/enemyIcon.png";

import orkImage from "../assets/Images/enemy/ork2Idle.png";
import orkHeadImage from "../assets/Images/enemy/ork2Icon.png";

import samuraiImage from "../assets/Images/enemy/samuraiIdle.png";
import samuraiIcon from "../assets/Images/enemy/samuraiIcon.png";

import samuraiHeavyImage from "../assets/Images/enemy/samuraiHeavyIdle.png";
import samuraiHeavyIcon from "../assets/Images/enemy/samuraiHeavyIcon.png";

import {
  CANVAS_DIMENSIONS,
  LEVEL1_ENEMY,
  NINJA_CONSTANT,
} from "../constants/constants";

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
      1,
      4 * assetsManager.DamageFactor,
      "level_1_sublevel_1",
      enemyImage,
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
      8 * assetsManager.DamageFactor,
      "level_2_Sublevel_1",
      orkImage,
      orkHeadImage,
      { x: 4, y: 5 }
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
      16 * assetsManager.DamageFactor,
      "level_3_Sublevel_1",
      samuraiImage,
      samuraiIcon,
      { x: 4, y: 5 }
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
      20,
      "level_4_Sublevel_1",
      samuraiHeavyImage,
      samuraiHeavyIcon,
      { x: 4, y: 5 }
    ),
  ],
];
