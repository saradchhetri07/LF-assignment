import { PLAYER } from "../constant";
import { DIMENSIONS } from "../constant";
export interface IPlayer {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityY: number;
  dx: number;
  gravity: number;
  isInitial: boolean;
  bounceStrength: number;
  isJumping: boolean;
  image: HTMLImageElement;

  moveLeft(): void;
  moveRight(): void;
  stopMoving(): void;
  update(): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

// Implement the Player class
export class Player implements IPlayer {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityY: number;
  dx: number;
  isInitial: boolean;
  gravity: number;
  bounceStrength: number;
  isJumping: boolean;
  speedX: number;
  image: HTMLImageElement;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    imageUrl: string
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocityY = 0;
    this.dx = 0; // Horizontal velocity
    this.gravity = PLAYER.GRAVITY;
    this.bounceStrength = PLAYER.JUMP_STRENGTH;
    this.isJumping = false;
    this.speedX = PLAYER.MOVE_SPEED;
    this.isInitial = true;
    this.image = new Image();
    this.image.src = imageUrl;
  }

  moveLeft(): void {
    this.dx = -this.speedX;
  }

  moveRight(): void {
    this.dx = this.speedX;
  }

  stopMoving(): void {
    this.dx = 0;
  }
  update(): void {
    this.velocityY += this.gravity;
    this.y += this.velocityY;
    this.x += this.dx;

    // Prevent player from moving out of canvas bounds horizontally
    // Wrap around canvas horizontally
    if (this.x + this.width < 0) {
      this.x = DIMENSIONS.CANVAS_WIDTH;
    } else if (this.x > DIMENSIONS.CANVAS_WIDTH) {
      this.x = -this.width;
    }

    // // Floor collision detection
    if (this.isInitial && this.y > DIMENSIONS.CANVAS_HEIGHT - this.height) {
      this.y = DIMENSIONS.CANVAS_HEIGHT - this.height;
      this.velocityY = this.bounceStrength; // Automatically bounce
      this.isJumping = true;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
