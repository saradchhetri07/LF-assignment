import { Platform } from "./../interfaces/interface";
import { Level } from "./level";
import { Player } from "../classes/player";
import kunaiImage from "../assets/Images/player/kunaiIcon.png";

interface Drawable {
  display(context: CanvasRenderingContext2D): void;
}

interface Pickable {
  isPickedUp(player: Player): boolean;
}

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

export class Kunai implements Drawable, Pickable {
  position: Position;
  Level: number;
  size: Size;
  count: number;
  image: HTMLImageElement;
  damageLevel: number = 4;
  isRightDirection: boolean;
  velocity: { x: number; y: number } = { x: 8, y: 0 };
  kunaisOnPlatform: Kunai[] = [];

  constructor(
    x: number,
    y: number,
    count: number,
    isRightDirection: boolean,
    level: number
  ) {
    this.position = { x, y };
    this.size = { width: 50, height: 20 };
    this.count = count;
    this.image = new Image();
    this.image.src = kunaiImage;
    this.isRightDirection = isRightDirection;
    this.Level = level;
  }

  increaseCount(): void {
    this.count++;
  }

  display(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }

  makeKunai(platforms: Platform[], kunaiNumber: number) {
    const kunais: Kunai[] = [];
    console.log("came to make kunais");
    for (let i = 0; i < platforms.length; i++) {
      const platformLevel = platforms[i].level;
      const KunaiHorizontalGap = 50; // Horizontal gap between Kunais
      if (this.Level == platformLevel && platforms[i].forPlacingKunai) {
        for (let j = 0; j < kunaiNumber; j++) {
          const kunai = new Kunai(
            platforms[i].x + KunaiHorizontalGap * j,
            platforms[i].y,
            this.count,
            false,
            this.Level
          );
          kunais.push(kunai);
        }
      }
    }
    this.kunaisOnPlatform = kunais;
    console.log(this.kunaisOnPlatform);
  }

  incrementKunaiLevel() {
    this.Level++;
  }

  clearkunais() {
    console.log("came to clearing kunais");

    this.kunaisOnPlatform = [];
  }

  getKunaisOnPlatform(): Kunai[] {
    return this.kunaisOnPlatform;
  }

  placeKunai(context: CanvasRenderingContext2D): void {
    console.log("came to draw the kunais");

    this.kunaisOnPlatform.forEach((kunai) => {
      context.drawImage(
        this.image,
        kunai.position.x,
        kunai.position.y - this.size.height,
        kunai.size.width,
        kunai.size.height
      );

      context.strokeStyle = "red";
      context.strokeRect(
        kunai.position.x,
        kunai.position.y,
        kunai.size.width,
        kunai.size.height
      );
    });
  }

  printKunaiStatus() {
    console.log("kunai status", this);
  }

  update(deltaTime: number, isRight: boolean) {
    if (this.isRightDirection) {
      this.position.x += (this.velocity.x * deltaTime) / 16.67;
    } else {
      this.position.x -= (this.velocity.x * deltaTime) / 16.67;
    }
  }

  isPickedUp(player: Player): boolean {
    return (
      player.position.x + player.size.width >= this.position.x &&
      player.position.x <= this.position.x + this.size.width &&
      player.position.y + player.size.height >= this.position.y &&
      player.position.y <= this.position.y + this.size.height
    );
  }
}
