import { Platform } from "../interfaces/interface";
import { Player } from "./player";
import scrollImage from "../assets/Images/gameplay/scroll.png";
import { assetsManager } from "./AssetsManager";

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

export class Weapon {
  position: Position;
  size: Size;
  Level: number = 1;
  type: string = "ork";
  damageLevel: number = 2;
  isRightDirection: boolean;
  image?: HTMLImageElement;
  velocity: { x: number; y: number } = { x: 6, y: 0 };

  constructor(
    x: number,
    y: number,
    enemyType: string,
    level: number,
    isRightDirection: boolean
  ) {
    this.position = { x, y };
    this.size = { width: 40, height: 40 };
    this.type = enemyType;
    this.Level = level;
    this.isRightDirection = isRightDirection;
    this.makeWeapon();
  }

  makeWeapon(): void {
    if (this.type == "level_2_Sublevel_1") {
      this.image = assetsManager.sprites.ORK_THROWABLE;
    } else {
      this.image = assetsManager.sprites.BOMBS;
    }
  }

  //placing the scrolls as per level
  display(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.image!,
      this.position.x,
      this.position.y - this.size.height / 2,
      this.size.width,
      this.size.height
    );
  }

  update(deltaTime: number) {
    if (this.isRightDirection) {
      this.position.x += (this.velocity.x * deltaTime) / 16.67;
    } else {
      this.position.x -= (this.velocity.x * deltaTime) / 16.67;
    }
  }
}
