import { BaseEnemy } from "./enemy";
import { Position, Size } from "../interfaces/interface";
import level_1_Enemy_1_Image from "../assets/Images/enemy/enemyIdle.png";

export class Level1Enemy1 extends BaseEnemy {
  constructor(position: Position, size: Size) {
    //max power 10, max health 10
    super(position, size, 10, 6, "Star", level_1_Enemy_1_Image);
  }
}

export class Level1Enemy2 extends BaseEnemy {
  constructor(position: Position, size: Size) {
    super(position, size, 60, 12, "Axe", "assets/images/level1Enemy2.png");
  }
}

export class Level2Enemy1 extends BaseEnemy {
  constructor(position: Position, size: Size) {
    super(position, size, 70, 20, "Spear", "assets/images/level2Enemy1.png");
  }
}

export class Level2Enemy2 extends BaseEnemy {
  constructor(position: Position, size: Size) {
    super(position, size, 80, 25, "Bow", "assets/images/level2Enemy2.png");
  }
}

export class Level3Enemy1 extends BaseEnemy {
  constructor(position: Position, size: Size) {
    super(position, size, 100, 30, "Dagger", "assets/images/level3Enemy1.png");
  }
}

export class Level3Enemy2 extends BaseEnemy {
  constructor(position: Position, size: Size) {
    super(
      position,
      size,
      110,
      35,
      "Crossbow",
      "assets/images/level3Enemy2.png"
    );
  }
}

export class Level4Enemy1 extends BaseEnemy {
  constructor(position: Position, size: Size) {
    super(position, size, 150, 40, "Katana", "assets/images/level4Enemy1.png");
  }
}

export class Level4Enemy2 extends BaseEnemy {
  constructor(position: Position, size: Size) {
    super(position, size, 160, 45, "Mace", "assets/images/level4Enemy2.png");
  }
}
