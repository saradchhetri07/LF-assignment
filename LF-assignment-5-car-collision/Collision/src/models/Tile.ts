export interface ITile {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
}
export class Tile implements ITile {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    imagePath: string
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.image = new Image();
    this.image.src = imagePath;
  }
}
