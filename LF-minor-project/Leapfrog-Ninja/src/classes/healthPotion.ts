import { Platform } from "../interfaces/interface";
import { CANVAS_DIMENSIONS } from "../constants/constants";

import { assetsManager } from "./AssetsManager";

interface Drawable {
  display(context: CanvasRenderingContext2D): void;
}

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

/**
 * Class representing a health potion.
 */
export class HealthPotion implements Drawable {
  position: Position;
  Level: number;
  size: Size;
  healthPotions: HealthPotion[] = [];
  image: HTMLImageElement;

  /**
   * Create a health potion.
   * @param {number} x - The x-coordinate of the health potion.
   * @param {number} y - The y-coordinate of the health potion.
   * @param {number} level - The level of the health potion.
   */
  constructor(x: number, y: number, level: number) {
    this.position = { x, y };
    this.size = { width: 50, height: 50 };
    this.image = new Image();
    this.image.src = assetsManager.sprites.HEALTH_POTION.src;
    this.Level = level;
  }

  /**
   * Create health potions and place them on platforms.
   * @param {Platform[]} platforms - The platforms on which to place the health potions.
   * @param {number} playerHeight - The height of the player.
   * @param {number} initialY - The initial y-coordinate of the player.
   */
  makeHealthPotion(platforms: Platform[]): void {
    const localHealthPotions: HealthPotion[] = [];

    for (let i = 0; i < platforms.length; i++) {
      const platformLevel = platforms[i].level;

      if (this.Level === platformLevel) {
        if (platformLevel == 1) i++;
        const healthPotion = new HealthPotion(
          CANVAS_DIMENSIONS.CANVAS_WIDTH / 2 + 100,
          CANVAS_DIMENSIONS.CANVAS_HEIGHT / 2 - 100,
          this.Level
        );

        localHealthPotions.push(healthPotion);
      }
    }

    this.healthPotions = localHealthPotions;
  }

  /**
   * Increase the level of the health potion.
   */
  increaseLevel(): void {
    this.Level++;
  }

  /**
   * Display the health potions on the canvas.
   * @param {CanvasRenderingContext2D} context - The drawing context.
   */
  display(context: CanvasRenderingContext2D): void {
    this.healthPotions.forEach((healthPotion) => {
      if (healthPotion.Level == this.Level) {
        context.drawImage(
          this.image,
          healthPotion.position.x,
          healthPotion.position.y,
          healthPotion.size.width,
          healthPotion.size.height
        );
      }
    });
  }
}
