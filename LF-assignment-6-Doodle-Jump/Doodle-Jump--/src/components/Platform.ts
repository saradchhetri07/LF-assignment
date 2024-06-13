import { DIMENSIONS, PLATFORM } from "../constant";
export interface IPlatform {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  direction: number;
  isMoving: boolean;
  hasJetPack: boolean;
  isgoodPlatform: boolean;
  jetPackImage: HTMLImageElement;
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
  jetPackImage: HTMLImageElement;
  hasJetPack: boolean;
  isgoodPlatform: boolean;
  constructor(
    x: number,
    y: number,
    imageUrl: string,
    jetPackPresent: boolean,
    isgood: boolean,
    jetPackImageSrc: string
  ) {
    this.x = x;
    this.y = y;
    this.width = PLATFORM.WIDTH;
    this.height = PLATFORM.HEIGHT;
    this.image = new Image();
    this.image.src = imageUrl;
    this.isMoving = false;
    this.direction = 1;
    this.hasJetPack = jetPackPresent;
    this.isgoodPlatform = isgood;
    this.jetPackImage = new Image();
    this.jetPackImage.src = jetPackImageSrc;
  }

  putJetPack(ctx: CanvasRenderingContext2D): void {}
  draw(ctx: CanvasRenderingContext2D, score: number): void {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    if (this.hasJetPack) {
      ctx.drawImage(
        this.jetPackImage,
        this.x + this.width / 2 - 15,
        this.y - 30,
        20,
        30
      );
    }

    if (score >= 500 && this.isMoving) {
      this.x += 2 * this.direction;
      if (this.x <= 0 || this.x + this.width >= DIMENSIONS.CANVAS_WIDTH) {
        this.direction *= -1; // Change direction
      }
    }
  }
}
