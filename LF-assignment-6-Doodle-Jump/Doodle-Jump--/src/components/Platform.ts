import { DIMENSIONS, PLATFORM } from "../constant";

/**
 * Interface for the Platform class defining its properties and methods.
 */
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

/**
 * Platform class representing a platform in the game.
 * Implements the IPlatform interface.
 */
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

  /**
   * Constructor for creating a new Platform instance.
   * @param x Initial x-coordinate of the platform.
   * @param y Initial y-coordinate of the platform.
   * @param imageUrl URL of the image for the platform.
   * @param jetPackPresent Boolean indicating if the platform has a jetpack.
   * @param isgood Boolean indicating if the platform is a good platform.
   * @param jetPackImageSrc URL of the image for the jetpack.
   */
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

  /**
   * Draw the platform on the canvas context provided.
   * @param ctx The canvas rendering context.
   * @param score Current score used for additional drawing logic.
   */
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    // Draw jetpack if the platform has it
    if (this.hasJetPack) {
      ctx.drawImage(
        this.jetPackImage,
        this.x + this.width / 2 - 15,
        this.y - 30,
        20,
        30
      );
    }

    if (this.isMoving) {
      this.x += 2 * this.direction;
      if (this.x <= 0 || this.x + this.width >= DIMENSIONS.CANVAS_WIDTH) {
        this.direction *= -1; // Reverse direction
      }
    }
  }
}
