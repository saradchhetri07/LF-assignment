import {
  Collidable,
  Drawable,
  Position,
  Size,
  Updatable,
} from "../interfaces/interface";

/**
 * Class representing an obstacle.
 */
export class Obstacle implements Drawable, Updatable, Collidable {
  position: Position;
  size: Size;
  type: string;
  image: HTMLImageElement;

  /**
   * Create a new obstacle.
   * @param {Position} position - The initial position of the obstacle.
   * @param {Size} size - The size of the obstacle.
   * @param {string} type - The type of the obstacle.
   * @param {string} imageSrc - The source of the obstacle's image.
   */

  constructor(position: Position, size: Size, type: string, imageSrc: string) {
    this.position = position;
    this.size = size;
    this.type = type;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  /**
   * Draw the obstacle on the canvas.
   * @param {CanvasRenderingContext2D} context - The drawing context.
   */

  draw(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }

  /**
   * Update the obstacle's state.
   * @param {number} deltaTime - The time elapsed since the last update.
   */

  update(deltaTime: number): void {
    // Update obstacle state
  }

  /**
   * Handle collisions with other objects.
   */
  handleCollision(): void {
    // Handle collisions with other objects
  }
}
