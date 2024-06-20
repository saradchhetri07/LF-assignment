import { AttackType, Character, Position, Size } from "../interfaces/interface";
import { getEnemySprite } from "../utils/getEnemySprite";
import Level_1_Sublevel_1_Enemy_Attack from "../assets/Images/enemy/enemyAttacking.png";
import { CANVAS_DIMENSIONS } from "../constants/constants";

/**
 * Enum representing the different animation states.
 */
enum AnimationState {
  Idle,
  Run,
  Attack,
  ThrowWeapon,
  Dead,
  moveUp,
}

/**
 * Interface representing the settings for animations.
 */
interface AnimationSettings {
  maxFrame: number;
  frameWidth: number;
  frameHeight: number;
  columns: number;
  rows: number;
  animationFrameRate: number;
}

/**
 * Class representing a base enemy.
 */
export class BaseEnemy implements Character {
  position: Position;
  damageLevel: number;
  size: Size;
  health: number;
  maxFrame: number;
  image: HTMLImageElement;
  power: number;
  frameX: number;
  frameY: number;
  maxHealth: number;
  initialY: number;
  animationState: AnimationState;
  animationFrameRate: number;
  animationFrameCount: number;
  velocity: { x: number; y: number };
  isJumping: boolean;
  isAttacking: boolean = false;
  isTurningLeft: boolean = false;
  isTurningRight: boolean = false;
  type: string;
  jumpHeight: number = 300;
  gravity: number = 9.8;
  isDead = false;
  enemyHead: HTMLImageElement;

  private verticalFrameTimer: number | null;
  private animationSettings: { [key in AnimationState]: AnimationSettings };

  /**
   * Create a new enemy.
   * @param {Position} position - The initial position of the enemy.
   * @param {Size} size - The size of the enemy.
   * @param {number} health - The initial health of the enemy.
   * @param {number} power - The power level of the enemy.
   * @param {number} damageLevel - The damage level of the enemy.
   * @param {string} type - The type of the enemy.
   * @param {string} imageSrc - The source path for the enemy image.
   * @param {string} imageHeadSrc - The source path for the enemy head image.
   * @param {Object} velocity - The initial velocity of the enemy.
   */
  constructor(
    position: Position,
    size: Size,
    health: number,
    power: number,
    damageLevel: number,
    type: string,
    imageSrc: string,
    imageHeadSrc: string,
    velocity: { x: number; y: number }
  ) {
    this.position = position;
    this.size = size;
    this.initialY = position.y;
    this.velocity = velocity;
    this.enemyHead = new Image();
    this.enemyHead.src = imageHeadSrc;
    this.health = health;
    this.maxHealth = 10;
    this.power = power;
    this.damageLevel = damageLevel;
    this.type = type;

    this.image = new Image();
    this.image.src = imageSrc;

    this.isJumping = false;
    this.isAttacking = false;

    this.animationState = AnimationState.Idle;
    this.animationFrameRate = 10; // Adjust based on your needs
    this.animationFrameCount = 0;
    this.verticalFrameTimer = null;

    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 10; // Assume there are 10 frames in the sprite sheet

    this.animationSettings = {
      [AnimationState.Idle]: {
        maxFrame: 10,
        frameWidth: 262 / 2,
        frameHeight: 1400 / 10,
        columns: 2,
        rows: 10,
        animationFrameRate: 10,
      },
      [AnimationState.Run]: {
        maxFrame: 10,
        frameWidth: 262 / 2,
        frameHeight: 1400 / 10,
        columns: 2,
        rows: 10,
        animationFrameRate: 10,
      },
      [AnimationState.Attack]: {
        maxFrame: 10,
        frameWidth: size.width,
        frameHeight: size.height,
        columns: 2,
        rows: 10,
        animationFrameRate: 10,
      },
      [AnimationState.ThrowWeapon]: {
        maxFrame: 10,
        frameWidth: size.width,
        frameHeight: size.height,
        columns: 2,
        rows: 10,
        animationFrameRate: 10,
      },
      [AnimationState.Dead]: {
        maxFrame: 10,
        frameWidth: size.width,
        frameHeight: size.height,
        columns: 2,
        rows: 10,
        animationFrameRate: 10,
      },
      [AnimationState.moveUp]: {
        maxFrame: 10,
        frameWidth: size.width,
        frameHeight: size.height,
        columns: 2,
        rows: 10,
        animationFrameRate: 10,
      },
    };
  }

  /**
   * Move the enemy in the specified direction.
   * @param {string} direction - The direction to move the enemy.
   */
  move(direction: string): void {
    switch (direction) {
      case "idle":
        this.setIdleState();
        break;
      case "moveLeft":
        this.moveLeft();
        break;
      case "moveRight":
        this.moveRight();
        break;
      case "moveUp":
        this.jump();
        break;
      case "Attack":
        this.attack();
        break;
      case "ThrowWeapon":
        this.throwWeapon();
        break;
      default:
        console.log("Invalid direction");
        break;
    }
  }

  /**
   * Set the enemy to the idle state.
   */
  private setIdleState(): void {
    this.animationState = AnimationState.Idle;
    this.isJumping = false;
    this.updateAnimation();
  }

  /**
   * Move the enemy to the left.
   */
  private moveLeft(): void {
    if (this.isJumping) return;
    this.isTurningLeft = true;
    this.isTurningRight = false;
    this.velocity.x = -8;
    this.frameX = 1;
    this.animationState = AnimationState.Run;
    this.updateAnimation();
  }

  /**
   * Move the enemy to the right.
   */
  private moveRight(): void {
    this.isTurningLeft = false;
    this.isTurningRight = true;
    this.velocity.x = 8;
    this.frameX = 0;
    this.animationState = AnimationState.Run;
    this.updateAnimation();
  }

  /**
   * Make the enemy jump.
   */
  private jump(): void {
    if (!this.isJumping) {
      this.velocity.y = -10;
      this.isJumping = true;
      this.animationState = AnimationState.moveUp;
      this.updateAnimation();
    }
  }

  /**
   * Make the enemy attack.
   */
  private attack(): void {
    this.animationState = AnimationState.Attack;
    this.isAttacking = true;
    this.updateAnimation();
  }

  /**
   * Make the enemy throw a weapon.
   */
  private throwWeapon(): void {
    this.animationState = AnimationState.ThrowWeapon;
    this.isAttacking = true;
    this.updateAnimation();
  }

  /**
   * Handle collisions with other objects.
   */
  handleCollision(): void {
    // Implement collision handling logic here
  }

  /**
   * Draw the enemy on the canvas.
   * @param {CanvasRenderingContext2D} context - The drawing context.
   */
  draw(context: CanvasRenderingContext2D): void {
    const { frameWidth, frameHeight } =
      this.animationSettings[this.animationState];

    // Draw the enemy's image
    context.drawImage(
      this.image,
      this.frameX * frameWidth,
      this.frameY * frameHeight,
      frameWidth,
      frameHeight,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );

    // Draw the rectangle around the enemy's image
    context.strokeStyle = "red";
    context.strokeRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }

  /**
   * Decrease the enemy's health when hit by an opponent.
   * @param {number} damage - The amount of damage to inflict.
   */
  decreaseHealth(damage: number): void {
    this.health -= damage;
    if (this.health <= 0) {
      this.health = 0;
      this.animationState = AnimationState.Dead;
      this.isDead = true;
    } else {
      console.log(`Player health: ${this.health}`);
    }
  }

  /**
   * Update the enemy's state.
   * @param {number} deltaTime - The time elapsed since the last update.
   */
  update(deltaTime: number): void {
    this.updatePosition(deltaTime);
    this.handleBoundaryCollisions();
    this.updateAnimation();
  }

  /**
   * Update the enemy's position based on its velocity.
   * @param {number} deltaTime - The time elapsed since the last update.
   */
  private updatePosition(deltaTime: number): void {
    if (this.isJumping) {
      this.position.y += (this.velocity.y * deltaTime) / 16.67;
      if (this.position.y <= this.initialY - this.jumpHeight) {
        this.velocity.y = this.gravity;
      }
    }

    if (!this.isJumping && this.position.y < this.initialY) {
      this.position.y += this.gravity;
    }

    if (this.animationState == AnimationState.Run) {
      this.image.src = getEnemySprite(this.type, "Run");
      this.position.x += this.velocity.x;
    }

    if (this.animationState == AnimationState.Idle) {
      this.isAttacking = false;
      this.image.src = getEnemySprite(this.type, "Idle");
    }

    if (this.animationState == AnimationState.Attack) {
      this.isAttacking = true;
      this.image.src = getEnemySprite(this.type, "Attack");
    }

    if (this.animationState == AnimationState.moveUp) {
      this.image.src = getEnemySprite(this.type, "moveUp");
      this.position.y += this.velocity.y;
    }

    if (this.animationState == AnimationState.ThrowWeapon) {
      this.isAttacking = true;
      this.image.src = getEnemySprite(this.type, "ThrowWeapon")!;
      this.position.y += this.velocity.y;
    }

    if (this.animationState == AnimationState.Dead) {
      this.isAttacking = false;
      this.image.src = getEnemySprite(this.type, "Dead");
    }
  }

  /**
   * Handle collisions with the canvas boundaries.
   */
  private handleBoundaryCollisions(): void {
    if (this.position.x + this.size.width >= CANVAS_DIMENSIONS.CANVAS_WIDTH) {
      this.position.x = CANVAS_DIMENSIONS.CANVAS_WIDTH - this.size.width;
    }

    if (this.position.y > this.initialY) {
      this.position.y = this.initialY;
    }

    if (this.position.x < 0) {
      this.position.x = 0;
    }
  }

  /**
   * Update the enemy's animation.
   */
  private updateAnimation(): void {
    const { maxFrame, frameWidth, frameHeight, animationFrameRate } =
      this.animationSettings[this.animationState];
    this.maxFrame = maxFrame;

    const currentAnimationFrameRate =
      this.animationState === AnimationState.Attack
        ? this.animationSettings[AnimationState.Attack].animationFrameRate
        : animationFrameRate;

    if (this.animationState == AnimationState.Attack) {
      this.handleVerticalAnimation(currentAnimationFrameRate);
    } else if (this.animationState == AnimationState.Dead) {
      this.handleDeadAnimation(currentAnimationFrameRate);
    } else {
      this.handleRegularAnimation(currentAnimationFrameRate);
    }
  }

  /**
   * Handle the animation for vertical movements.
   * @param {number} frameRate - The frame rate for the animation.
   */
  private handleVerticalAnimation(frameRate: number): void {
    if (!this.verticalFrameTimer) {
      this.verticalFrameTimer = setTimeout(() => {
        this.frameY =
          (this.frameY + 1) % this.animationSettings[this.animationState].rows;
        this.verticalFrameTimer = null; // Reset timer after the frame update
      }, 1000 / frameRate); // Delay for the vertical frames
    }
  }

  /**
   * Handle the animation for the dead state.
   * @param {number} frameRate - The frame rate for the animation.
   */
  private handleDeadAnimation(frameRate: number): void {
    if (this.animationFrameCount++ >= frameRate) {
      this.animationFrameCount = 0;
      this.frameY = this.frameY + 1;
    }
  }

  /**
   * Handle regular animations.
   * @param {number} frameRate - The frame rate for the animation.
   */
  private handleRegularAnimation(frameRate: number): void {
    if (this.animationFrameCount++ >= frameRate) {
      this.animationFrameCount = 0;
      this.frameY =
        (this.frameY + 1) % this.animationSettings[this.animationState].rows;
    }
  }
}
