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

export interface Sound {
  audio: HTMLAudioElement;
  loop: boolean;
}

export enum gameState {
  isActive,
  isPaused,
}

export interface Platform extends Position, Size {
  level: number;
  forPlacingKunai: boolean;
}

export interface ICharacter extends Drawable, Movable {
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

/**
 * Interface representing the settings for animations.
 */
export interface AnimationSettings {
  maxFrame: number;
  frameWidth: number;
  frameHeight: number;
  columns: number;
  rows: number;
  animationFrameRate: number;
}
