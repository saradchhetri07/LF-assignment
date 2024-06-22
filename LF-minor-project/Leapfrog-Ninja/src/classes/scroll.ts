import { Player } from "../classes/player";
import scrollImage from "../assets/Images/gameplay/scroll.png";

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

export class Scroll implements Drawable, Pickable {
  position: Position;
  size: Size;
  image: HTMLImageElement;
  count: number = 0;

  constructor(x: number, y: number) {
    this.position = { x, y };
    this.size = { width: 80, height: 80 };
    this.image = new Image();
    this.image.src = scrollImage;
  }

  increaseCount(): void {
    this.count++;
  }

  display(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y - this.size.height,
      this.size.width,
      this.size.height
    );

    // Set the stroke style to red
    context.strokeStyle = "red";

    // Draw the rectangle around the player's image
    context.strokeRect(
      this.position.x,
      this.position.y - this.size.height,
      this.size.width,
      this.size.height
    );
  }

  update(deltaTime: number) {}

  isPickedUp(player: Player): boolean {
    return (
      player.position.x + player.size.width >= this.position.x &&
      player.position.x <= this.position.x + this.size.width &&
      player.position.y + player.size.height >= this.position.y &&
      player.position.y <= this.position.y + this.size.height
    );
  }
}
