import {
  Collidable,
  Drawable,
  Position,
  Size,
  Updatable,
} from "../interfaces/interface";

/**
 * Class representing a collectible item.
 */
export class Item implements Drawable, Updatable, Collidable {
  position: Position;
  size: Size;
  type: string;
  image: HTMLImageElement;

  /**
   * Create a new item.
   * @param {Position} position - The initial position of the item.
   * @param {Size} size - The size of the item.
   * @param {string} type - The type of the item.
   * @param {string} imageSrc - The source of the item's image.
   */
  constructor(position: Position, size: Size, type: string, imageSrc: string) {
    this.position = position;
    this.size = size;
    this.type = type;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  /**
   * Collect the item.
   */
  collect(): void {
    // Handle item collection
  }

  /**
   * Draw the item on the canvas.
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
   * Update the item's state.
   * @param {number} deltaTime - The time elapsed since the last update.
   */
  update(deltaTime: number): void {
    // Update item state
  }

  /**
   * Handle collisions with other objects.
   */
  handleCollision(): void {
    // Handle collisions with other objects
  }
}
