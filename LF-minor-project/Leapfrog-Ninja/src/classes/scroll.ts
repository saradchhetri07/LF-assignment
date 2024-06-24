import { Platform } from "./../interfaces/interface";
import { Player } from "../classes/player";
import scrollImage from "../assets/Images/gameplay/scroll.png";

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

export class Scroll implements Drawable {
  position: Position;
  size: Size;
  image: HTMLImageElement;
  count: number = 0;
  Level: number = 1;
  localScroll: Scroll[] = [];

  constructor(x: number, y: number, level: number) {
    this.position = { x, y };
    this.size = { width: 50, height: 50 };
    this.image = new Image();
    this.image.src = scrollImage;
    this.Level = level;
  }

  increaseCount(): void {
    this.count++;
  }

  //making scroll list for all levels
  makeScroll(platforms: Platform[]): void {
    const scrolls: Scroll[] = [];
    for (let i = 0; i < platforms.length; i++) {
      const platformLevel = platforms[i].level;
      if (this.Level == platformLevel && (i + 1) % 2 == 0) {
        const scroll = new Scroll(platforms[i].x, platforms[i].y, this.Level);
        scrolls.push(scroll);
      }
    }
    this.localScroll = scrolls;
  }

  //placing the scrolls as per level
  display(context: CanvasRenderingContext2D): void {
    this.localScroll.forEach((scroll) => {
      context.drawImage(
        this.image,
        scroll.position.x,
        scroll.position.y - scroll.size.height - 40,
        this.size.width,
        this.size.height
      );

      // Set the stroke style to red
      context.strokeStyle = "red";

      // Draw the rectangle around the player's image
      context.strokeRect(
        scroll.position.x,
        scroll.position.y - scroll.size.height - 40,
        this.size.width,
        this.size.height
      );
    });
  }

  clearScroll(): void {
    this.localScroll = [];
  }

  incrementScrollLevel(): void {
    this.Level++;
  }

  update(deltaTime: number) {}
}
