import { AttackType, Character, Position, Size } from "../interfaces/interface";
import { getEnemySprite } from "../utils/getEnemySprite";
import Level_1_Sublevel_1_Enemy_Attack from "../assets/Images/enemy/enemyAttacking.png";
import { CANVAS_DIMENSIONS } from "../constants/constants";

/**
 * Base class representing an enemy.
 */
/**
 * Base class representing an enemy.
 */

enum AnimationState {
  Idle,
  Run,
  Attack,
  ThrowWeapon,
  Dead,
  moveUp,
}

interface AnimationSettings {
  maxFrame: number;
  frameWidth: number;
  frameHeight: number;
  columns: number;
  rows: number;
  animationFrameRate: number;
}

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
    (this.enemyHead.src = imageHeadSrc), (this.health = health);
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
    this.maxFrame = 10; // Assume there are 4 frames (0 to 3) in the sprite sheet

    this.animationSettings = {
      [AnimationState.Idle]: {
        maxFrame: 10,
        frameWidth: 262 / 2,
        frameHeight: 1400 / 10,
        columns: 2,
        rows: 10,
        animationFrameRate: 10, // Add this line
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
      [AnimationState.Poke]: {
        maxFrame: 10,
        frameWidth: size.width,
        frameHeight: size.height,
        columns: 1,
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

  move(direction: string): void {
    switch (direction) {
      case "idle":
        this.animationState = AnimationState.Idle;
        this.isJumping = false;
        break;

      case "moveLeft":
        if (this.isJumping) break;
        this.isTurningLeft = true;
        this.isTurningRight = false;
        this.velocity.x = -8;
        this.frameX = 1;
        this.animationState = AnimationState.Run;
        break;

      case "moveRight":
        this.isTurningLeft = false;
        this.isTurningRight = true;
        this.velocity.x = 8;
        this.frameX = 0;
        this.animationState = AnimationState.Run;
        console.log(this.position);
        break;

      case "moveUp":
        if (!this.isJumping) {
          this.velocity.y = -10;
          this.isJumping = true;
          this.animationState = AnimationState.moveUp;
        }
        break;

      case "Attack":
        this.animationState = AnimationState.Attack;
        break;

      case "ThrowWeapon":
        this.animationState = AnimationState.ThrowWeapon;
        break;

      default:
        console.log("key up");
        break;
    }
    this.updateAnimation();
  }

  handleCollision(): void {
    // Handle collisions with other objects
  }

  draw(context: CanvasRenderingContext2D): void {
    const { frameWidth, frameHeight } =
      this.animationSettings[this.animationState];

    // Draw the player's image
    context.drawImage(
      this.image,
      this.frameX * frameWidth,
      this.frameY * frameHeight,
      frameWidth, // Use frameWidth for the source width
      frameHeight, // Use frameHeight for the source height
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );

    // Set the stroke style to red
    context.strokeStyle = "red";

    // Draw the rectangle around the player's image
    context.strokeRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }

  //function to decrease the player health when hit by opponent
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

  update(deltaTime: number): void {
    if (this.isJumping) {
      this.position.y += (this.velocity.y * deltaTime) / 16.67;
      if (this.position.y <= this.initialY - this.jumpHeight) {
        this.velocity.y = this.gravity;
      }
    }

    if (this.position.x + this.size.width >= CANVAS_DIMENSIONS.CANVAS_WIDTH) {
      console.log(
        "collided",
        this.position,
        this.size,
        CANVAS_DIMENSIONS.CANVAS_WIDTH
      );

      this.position.x = CANVAS_DIMENSIONS.CANVAS_WIDTH - this.size.width;
    }

    if (this.position.y > this.initialY) {
      this.position.y = this.initialY;
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
      // this.velocity.x = 0;
      // this.velocity.y = 0;
    }

    if (this.animationState == AnimationState.Attack) {
      this.isAttacking = true;
      console.log(this.type);
      this.image.src = getEnemySprite(this.type, "Attack");

      console.log("enemy came to attack");
      // this.position.x += this.velocity.x;
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

    if (this.position.x < 0) this.position.x = 0;

    this.updateAnimation();
  }

  updateAnimation(): void {
    const { maxFrame, frameWidth, frameHeight, animationFrameRate } =
      this.animationSettings[this.animationState];
    this.maxFrame = maxFrame;

    // If the animation state is Attack, use a different frame rate
    const currentAnimationFrameRate =
      this.animationState === AnimationState.Attack
        ? this.animationSettings[AnimationState.Attack].animationFrameRate
        : animationFrameRate;

    // Handle vertical frame timer
    if (this.animationState == AnimationState.Attack) {
      if (!this.verticalFrameTimer) {
        this.verticalFrameTimer = setTimeout(() => {
          this.frameY =
            (this.frameY + 1) %
            this.animationSettings[this.animationState].rows;
          this.verticalFrameTimer = null; // Reset timer after the frame update
        }, 1000 / currentAnimationFrameRate); // Delay for the vertical frames
      }
    } else if (this.animationState == AnimationState.Dead) {
      console.log("enemy is in dead mode");
      console.log(this.animationState);
      if (this.animationFrameCount++ >= currentAnimationFrameRate) {
        this.animationFrameCount = 0;
        this.frameY = this.frameY + 1;
        if (this.frameY >= currentAnimationFrameRate) {
        }
      }
    } else {
      if (this.animationFrameCount++ >= currentAnimationFrameRate) {
        this.animationFrameCount = 0;
        this.frameY =
          (this.frameY + 1) % this.animationSettings[this.animationState].rows;
      }
    }
  }
}
