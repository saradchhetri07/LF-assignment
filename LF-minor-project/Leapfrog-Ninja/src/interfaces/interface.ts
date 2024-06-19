export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export enum AttackType {
  Slash,
  ThrowWeapon,
  Poke,
}

export interface Drawable {
  draw(context: CanvasRenderingContext2D, image: HTMLImageElement): void;
}

export interface Updatable {
  update(deltaTime: number): void;
}

export interface Movable {
  move(direction: string): void;
}

export interface Collidable {
  handleCollision(): void;
}

export interface Sound {
  audio: HTMLAudioElement;
  loop: boolean;
}

export enum gameState {
  isActive,
  isPaused,
}

export interface Character extends Drawable, Movable, Collidable {
  position: Position;
  damageLevel: number;
  size: Size;
  health: number;
  maxHealth: number;
  image: HTMLImageElement;
  power: number;
  frameX: number;
  frameY: number;
  maxFrame: number;
  velocity: { x: number; y: number };
  isJumping: boolean;
}
