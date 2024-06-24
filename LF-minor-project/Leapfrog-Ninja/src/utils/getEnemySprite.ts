import Level_1_Sublevel_1_Enemy_Idle from "../assets/Images/enemy/enemyIdle.png";
import Level_1_Sublevel_1_Enemy_Run from "../assets/Images/enemy/enemyRunning.png";
import Level_1_Sublevel_1_Enemy_Attack from "../assets/Images/enemy/enemyAttacking.png";
import Level_1_Sublevel_1_Enemy_Dead from "../assets/Images/enemy/enemyDead.png";

import Level_2_Sublevel_1_Enemy_Idle from "../assets/Images/enemy/ork2Idle.png";
import Level_2_Sublevel_1_Enemy_Attack from "../assets/Images/enemy/ork2Attacking.png";
import Level_2_Sublevel_1_Enemy_Run from "../assets/Images/enemy/ork2Running.png";
import Level_2_Sublevel_1_Enemy_Dead from "../assets/Images/enemy/ork2Dying.png";
import { assetsManager } from "../classes/AssetsManager";

export const getEnemySprite = (
  type: string,
  state: string
): HTMLImageElement => {
  if (type == "level_1_sublevel_1") {
    console.log("came to get sublevel image");

    if (state == "Idle") {
      return assetsManager.sprites.BANDITIDLE;
      // return Level_1_Sublevel_1_Enemy_Idle;
    } else if (state == "Run") {
      return assetsManager.sprites.BANDITRUNNING;
      // return Level_1_Sublevel_1_Enemy_Run;
    } else if (state == "Attack") {
      return assetsManager.sprites.BANDITATTACKING;
      // return Level_1_Sublevel_1_Enemy_Attack;
    } else if (state == "Dead") {
      return assetsManager.sprites.BANDITDYING;
      // return Level_1_Sublevel_1_Enemy_Dead;
    }
  }

  if (type == "level_2_Sublevel_1") {
    if (state == "Idle") {
      return assetsManager.sprites.ORK2IDLE;
    } else if (state == "Run") {
      return assetsManager.sprites.ORK2RUNNING;
    } else if (state == "Attack") {
      return assetsManager.sprites.ORK2ATTACKING;
    } else if (state == "Dead") {
      return assetsManager.sprites.ORK2DYING;
    } else if (state == "moveUp") {
      return assetsManager.sprites.ORK2IDLE;
    }
  }

  if (type == "level_3_Sublevel_1") {
    if (state == "Idle") {
      return assetsManager.sprites.SAMURAIDLE;
    } else if (state == "Run") {
      return assetsManager.sprites.SAMURAIRUNNING;
    } else if (state == "Attack") {
      return assetsManager.sprites.SAMURAIATTACKING;
    } else if (state == "Dead") {
      return assetsManager.sprites.SAMURAIDYING;
    } else if (state == "moveUp") {
      return assetsManager.sprites.SAMURAIDLE;
    }
  }

  return assetsManager.sprites.SAMURAIDLE;
  // return Level_1_Sublevel_1_Enemy_Dead;
};
