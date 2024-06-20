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
  size: Size;
  count: number;
  image: HTMLImageElement;
  damageLevel: number = 4;
  isRightDirection: boolean;
  velocity: { x: number; y: number } = { x: 8, y: 0 };

  constructor(x: number, y: number, count: number, isRightDirection: boolean) {
    this.position = { x, y };
    this.size = { width: 50, height: 20 };
    this.count = count;
    this.image = new Image();
    this.image.src = kunaiImage;
    this.isRightDirection = isRightDirection;
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
