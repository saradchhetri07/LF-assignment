import { assetsManager } from "../classes/AssetsManager";

export const getEnemySprite = (
  type: string,
  state: string
): HTMLImageElement => {
  if (type == "level_1_sublevel_1") {
    if (state == "Idle") {
      return assetsManager.sprites.BANDITIDLE;
    } else if (state == "Run") {
      return assetsManager.sprites.BANDITRUNNING;
    } else if (state == "Attack") {
      return assetsManager.sprites.BANDITATTACKING;
    } else if (state == "Dead") {
      return assetsManager.sprites.BANDITDYING;
    } else {
      return assetsManager.sprites.BANDITATTACKING;
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
    } else if (state == "ThrowWeapon") {
      return assetsManager.sprites.ORK2ATTACKING;
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
    } else if (state == "ThrowWeapon") {
      return assetsManager.sprites.SAMURAIDLE;
    }
  }

  if (type == "level_4_Sublevel_1") {
    if (state == "Idle") {
      return assetsManager.sprites.SAMURAIHEAVYIDLE;
    } else if (state == "Run") {
      return assetsManager.sprites.SAMURAIHEAVYRUNNING;
    } else if (state == "Attack") {
      return assetsManager.sprites.SAMURAIHEAVYATTACKING;
    } else if (state == "Dead") {
      return assetsManager.sprites.SAMURAIHEAVYDYING;
    } else if (state == "moveUp") {
      return assetsManager.sprites.SAMURAIHEAVYIDLE;
    } else if (state == "ThrowWeapon") {
      return assetsManager.sprites.SAMURAIHEAVYATTACKING;
    }
  }

  return assetsManager.sprites.SAMURAIDLE;
};
