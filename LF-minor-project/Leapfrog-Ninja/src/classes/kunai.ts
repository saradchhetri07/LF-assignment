import { Platform } from "./../interfaces/interface";
import kunaiImage from "../assets/Images/player/kunaiIcon.png";
import leftKunaiImage from "../assets/Images/enemy/kunaiLeft.png";
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

export class Kunai implements Drawable {
  position: Position;
  Level: number;
  size: Size;
  count: number;
  image: HTMLImageElement;
  leftImage: HTMLImageElement;
  damageLevel: number = 4;
  isRightDirection: boolean;
  velocity: { x: number; y: number } = { x: 8, y: 0 };
  kunaisOnPlatform: Kunai[] = [];
  isOnCorretPlatform: boolean = false;
  verticalOffset: number = 40;

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
    this.leftImage = new Image();
    this.leftImage.src = leftKunaiImage;
  }

  increaseCount(): void {
    this.count++;
  }

  display(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.image,
      this.position.x - 30,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }

  makeKunai(platforms: Platform[], kunaiNumber: number) {
    const kunais: Kunai[] = [];
    for (let i = 0; i < platforms.length; i++) {
      const platformLevel = platforms[i].level;
      const KunaiHorizontalGap = 50; // Horizontal gap between Kunais
      if (this.Level == platformLevel && platforms[i].forPlacingKunai) {
        for (let j = 0; j < kunaiNumber; j++) {
          const kunai = new Kunai(
            platforms[i].x + KunaiHorizontalGap * j,
            platforms[i].y - this.verticalOffset,
            this.count,
            false,
            this.Level
          );
          kunai.isOnCorretPlatform = true;
          kunais.push(kunai);
        }
      }
    }
    this.kunaisOnPlatform = kunais;
  }

  incrementKunaiLevel() {
    this.Level++;
  }

  clearkunais() {
    this.kunaisOnPlatform = [];
  }

  getKunaisOnPlatform(): Kunai[] {
    return this.kunaisOnPlatform;
  }

  placeKunai(context: CanvasRenderingContext2D): void {
    this.kunaisOnPlatform.forEach((kunai) => {
      context.drawImage(
        this.image,
        kunai.position.x,
        kunai.position.y - this.size.height,
        kunai.size.width,
        kunai.size.height
      );

      // context.strokeStyle = "red";
      // context.strokeRect(
      //   kunai.position.x,
      //   kunai.position.y,
      //   kunai.size.width,
      //   kunai.size.height
      // );
    });
  }

  update(deltaTime: number) {
    if (this.isRightDirection) {
      this.position.x += (this.velocity.x * deltaTime) / 16.67;
    } else {
      this.image = this.leftImage;
      this.position.x -= (this.velocity.x * deltaTime) / 16.67;
    }
  }
}
