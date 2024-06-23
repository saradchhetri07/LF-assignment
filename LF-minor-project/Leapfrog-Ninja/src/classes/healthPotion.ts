import { Platform } from "./../interfaces/interface";
import { Player } from "../classes/player";
import healthPotionImage from "../assets/Images/gameplay/healthPotion.png";
import { CANVAS_DIMENSIONS } from "../constants/constants";

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
    this.size = { width: 50, height: 20 };
    this.image = new Image();
    this.image.src = healthPotionImage;
    this.Level = level;
  }

  makeHealthPotion(platform: Platform[]): void {
    const localhealthPotions: HealthPotion[] = [];

    for (let i = 0; i < platform.length; i++) {
      const platformLevel = platform[i].level;

      if (this.Level == platformLevel) {
        console.log("came to make health potions");

        if (i == 0) continue;

        const healthPotion = new HealthPotion(
          platform[i].x,
          platform[i].y,
          this.Level + 1
        );

        console.log("create health potion is", healthPotion);

        localhealthPotions.push(healthPotion);
      }
    }
    this.healthPotions = localhealthPotions;
  }
  increaseLevel(): void {
    this.Level++;
  }
  display(context: CanvasRenderingContext2D): void {
    this.healthPotions.forEach((healthPotion) => {
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
