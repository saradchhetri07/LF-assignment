export interface IFire {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
}

export class Fire implements IFire {
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

  // draw(ctx: CanvasRenderingContext2D) {
  //   ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  // }
}
