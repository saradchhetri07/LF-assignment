import { Player } from "../classes/player";
import kunaiImage from "../assets/Images/player/kunai.png";

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

class Kunai implements Drawable, Pickable {
  position: Position;
  size: Size;
  count: number;
  image: HTMLImageElement;

  constructor(x: number, y: number, count: number) {
    this.position = { x, y };
    this.size = { width: 50, height: 5 };
    this.count = count;
    this.image = new Image();
    this.image.src = kunaiImage;
  }

  increaseCount(): void {
    this.count++;
  }

  display(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.image,
      0,
      0,
      60,
      15,
      this.position.x,
      this.position.y - 30,
      50,
      15
    );
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
