import { DIMENSIONS, PLATFORM } from "../constant";
import { getRandomInt } from "../utils/common";

export interface IPlatform {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  direction: number;
  isMoving: boolean;
  draw(ctx: CanvasRenderingContext2D, score: number): void;
}

// Implement the Platform class
export class Platform implements IPlatform {
  x: number;
  y: number;
  width: number;
  height: number;
  isMoving: boolean;
  image: HTMLImageElement;
  direction: number;
  constructor(x: number, y: number, imageUrl: string) {
    this.x = x;
    this.y = y;
    this.width = PLATFORM.WIDTH;
    this.height = PLATFORM.HEIGHT;
    this.image = new Image();
    this.image.src = imageUrl;
    this.isMoving = false;
    this.direction = 1;
  }

  draw(ctx: CanvasRenderingContext2D, score: number): void {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    if (score >= 500 && this.isMoving) {
      this.x += 2 * this.direction;
      if (this.x <= 0 || this.x + this.width >= DIMENSIONS.CANVAS_WIDTH) {
        this.direction *= -2; // Change direction
      }
    }
  }
}
