import Level_1_Sublevel_1_Enemy_Idle from "../assets/Images/enemy/enemyIdle.png";
import Level_1_Sublevel_1_Enemy_Run from "../assets/Images/enemy/enemyRunning.png";
import Level_1_Sublevel_1_Enemy_Attack from "../assets/Images/enemy/enemyAttacking.png";
import Level_1_Sublevel_1_Enemy_Dead from "../assets/Images/enemy/enemyDead.png";

export const getEnemySprite = (type: string, state: string): string => {
  if (type == "level_1_sublevel_1") {
    if (state == "Idle") {
      return Level_1_Sublevel_1_Enemy_Idle;
    } else if (state == "Run") {
      return Level_1_Sublevel_1_Enemy_Run;
    } else if (state == "Attack") {
      return Level_1_Sublevel_1_Enemy_Attack;
    } else if (state == "Dead") {
      return Level_1_Sublevel_1_Enemy_Dead;
    }
  }

  return Level_1_Sublevel_1_Enemy_Idle;
};
