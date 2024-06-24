import { Scroll } from "./scroll";
import { Platform } from "./../interfaces/interface";
import { Player } from "../classes/player";
import { CANVAS_DIMENSIONS } from "../constants/constants";
import { getRandomValue } from "../utils/randomValue";
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

export class HealthPotion implements Drawable {
  position: Position;
  Level: number;
  size: Size;
  healthPotions: HealthPotion[] = [];
  image: HTMLImageElement;

  constructor(x: number, y: number, level: number) {
    this.position = { x, y };
    this.size = { width: 50, height: 50 };
    this.image = new Image();
    this.image = assetsManager.sprites.HEALTH_POTION;
    this.Level = level;
  }

  makeHealthPotion(
    platform: Platform[],
    playerHeight: number,
    initialY: number
  ): void {
    const localhealthPotions: HealthPotion[] = [];

    for (let i = 0; i < platform.length; i++) {
      const platformLevel = platform[i].level;

      if (this.Level == platformLevel) {
        const healthPotion = new HealthPotion(
          getRandomValue(0, CANVAS_DIMENSIONS.CANVAS_WIDTH - this.size.width),
          getRandomValue(
            100,
            CANVAS_DIMENSIONS.CANVAS_HEIGHT - initialY - playerHeight
          ),
          this.Level
        );

        console.log("create health potion is", healthPotion);

        localhealthPotions.push(healthPotion);
      }
    }

    this.healthPotions = localhealthPotions;
    console.log("health potions is", this.healthPotions);
  }

  increaseLevel(): void {
    this.Level++;
  }

  display(context: CanvasRenderingContext2D): void {
    this.healthPotions.forEach((healthPotion) => {
      console.log("came to draw health Potion", healthPotion);

      context.drawImage(
        this.image,
        healthPotion.position.x,
        healthPotion.position.y,
        healthPotion.size.width,
        healthPotion.size.height
      );
    });
  }
}
