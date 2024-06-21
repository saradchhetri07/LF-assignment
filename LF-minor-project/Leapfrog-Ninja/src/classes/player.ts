import {
  Character,
  Position,
  Size,
  AttackType,
  Platform,
} from "../interfaces/interface";
import playerIdleImage from "../assets/Images/player/ninjaBoyIdle.png";
import playerMoveImage from "../assets/Images/player/ninjaBoyMove.png";
import playerAttackImage from "../assets/Images/player/ninjaBoyAttack.png";
import playerJumpImage from "../assets/Images/player/ninjaBoyJumping.png";
import playerRunImage from "../assets/Images/player/ninjaBoyRunning.png";
import playerDeadImage from "../assets/Images/player/ninjaBoyDead.png";
import playerThrowImage from "../assets/Images/player/ninjaBoyThrowing.png";
import playerHeadImage from "../assets/Images/player/ninjaBoyIcon.png";
import kunaiImage from "../assets/Images/player/kunaiDown.png";

import {
  CANVAS_DIMENSIONS,
  KUNAI_CONSTANT,
  NINJA_SPRITE_RUNNING,
} from "../constants/constants";
import { Kunai } from "./kunai";

enum AnimationState {
  Idle,
  Run,
  Attack,
  ThrowWeapon,
  Poke,
  Dead,
  moveUp,
}

interface AnimationSettings {
  image: string;
  maxFrame: number;
  frameWidth: number;
  frameHeight: number;
  columns: number;
  rows: number;
  animationFrameRate: number;
}

export class Player implements Character {
  position: Position;
  damageLevel: number;
  size: Size;
  health: number;
  image: HTMLImageElement;
  power: number;
  maxHealth: number;
  kunaiCount: number = 5;
  frameX: number;
  frameY: number;
  maxFrame: number;
  velocity: { x: number; y: number };
  isJumping: boolean;
  animationState: AnimationState;
  animationFrameRate: number;
  animationFrameCount: number;
  isDead: boolean = false;
  gravity: number;
  isAttacking: boolean;
  jumpingForce: number = 12;
  playerHead: HTMLImageElement;
  kunaiImage: HTMLImageElement;
  kunaiWeapon: Kunai[] = [];

  isTurningLeft: boolean = false;
  isTurningRight: boolean = true;

  private initialY: number;
  private jumpHeight: number = 20;
  private verticalFrameTimer: number | null; // Timer for vertical movement

  private animationSettings: { [key in AnimationState]: AnimationSettings };

  constructor(
    position: Position,
    size: Size,
    imageSrc: string,
    maxFrame: number,
    health: number
  ) {
    this.position = position;
    this.size = size;
    this.playerHead = new Image();
    this.playerHead.src = playerHeadImage;

    this.health = health;
    this.maxHealth = 100;

    this.image = new Image();
    this.image.src = imageSrc;
    this.kunaiImage = new Image();
    this.kunaiImage.src = kunaiImage;
    //kunai weapon declare

    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = maxFrame;

    this.power = 10;
    this.velocity = { x: 0, y: 0 };
    this.isJumping = false;

    this.damageLevel = 6; //out of 10

    this.animationState = AnimationState.Idle;
    this.animationFrameRate = 10; // Adjust based on needs
    this.animationFrameCount = 0;

    this.initialY = position.y;
    this.isAttacking = false;
    this.gravity = 9.8;

    this.verticalFrameTimer = null; // Initialize vertical frame timer
    this.animationSettings = {
      [AnimationState.Idle]: {
        image: playerIdleImage,
        maxFrame: 10,
        frameWidth: 262 / 2,
        frameHeight: 1400 / 10,
        columns: 2,
        rows: 10,
        animationFrameRate: 10, // Add this line
      },
      [AnimationState.Run]: {
        image: playerMoveImage,
        maxFrame: 10,
        frameWidth: 262 / 2,
        frameHeight: 1400 / 10,
        columns: 2,
        rows: 10,
        animationFrameRate: 10,
      },
      [AnimationState.Attack]: {
        image: playerAttackImage,
        maxFrame: 10,
        frameWidth: size.width,
        frameHeight: size.height,
        columns: 2,
        rows: 10,
        animationFrameRate: 10,
      },
      [AnimationState.ThrowWeapon]: {
        image: playerThrowImage,
        maxFrame: 10,
        frameWidth: size.width,
        frameHeight: size.height,
        columns: 2,
        rows: 10,
        animationFrameRate: 10,
      },
      [AnimationState.Poke]: {
        image: playerMoveImage,
        maxFrame: 10,
        frameWidth: size.width,
        frameHeight: size.height,
        columns: 1,
        rows: 10,
        animationFrameRate: 10,
      },
      [AnimationState.Dead]: {
        image: playerDeadImage,
        maxFrame: 10,
        frameWidth: size.width,
        frameHeight: size.height,
        columns: 2,
        rows: 10,
        animationFrameRate: 10,
      },
      [AnimationState.moveUp]: {
        image: playerJumpImage,
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
        if (this.isJumping) break;
        this.isTurningLeft = false;
        this.isTurningRight = true;
        this.velocity.x = 8;
        this.frameX = 0;
        this.animationState = AnimationState.Run;
        break;

      case "moveUp":
        if (!this.isJumping) {
          this.velocity.y = -this.jumpingForce;
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
      this.size.width / 1.2,
      this.size.height / 1.3
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

  //increase the count of kunai
  increaseKunai(): void {
    this.kunaiCount++;
  }

  //function to decrease the player health when hit by opponent
  decreaseHealth(damage: number): void {
    this.health -= damage;
    if (this.health <= 0) {
      this.health = 0;
      this.animationState = AnimationState.Dead;
    } else {
      console.log(`Player health: ${this.health}`);
    }
  }

  /**
   * Check and handle collisions with platforms.
   * @param platforms - Array of platforms to check for collisions.
   */
  handlePlatformCollisions(platforms: Platform[]): void {
    for (const platform of platforms) {
      // console.log("platform", platform.y);
      // console.log("position of player", this.position.y);
      if (this.position.y + this.size.height <= platform.y) {
        console.log("hang onto it");

        this.position.y = platform.y - this.size.height;
        this.velocity.y = 0;
        this.isJumping = false;
      }

      // if (
      //   this.position.x < platform.x + platform.width &&
      //   this.position.x + this.size.width > platform.x &&
      //   this.position.y + this.size.height <= platform.y &&
      //   this.position.y + this.size.height + this.velocity.y >= platform.y
      // ) {
      //   console.log("came to handle collision");

      //   // Adjust player's position to sit on top of the platform
      //   this.position.y = platform.y - this.size.height;
      //   this.velocity.y = 0;
      //   this.isJumping = false;
      // }
    }
  }

  update(deltaTime: number, platforms: Platform[]): void {
    if (this.health <= 0) {
      this.animationState = AnimationState.Dead;
    }

    // //ifplayer reaches max height
    // if (this.position.y <= this.jumpHeight) {
    //   console.log("reached max height");

    //   this.velocity.y = -this.gravity;
    //   this.isJumping = false;
    // }

    // if (this.isJumping) {
    //   console.log("is jumping ");

    //   this.position.y += (this.velocity.y * deltaTime) / 16.67;
    //   if (this.position.y <= this.initialY - this.jumpHeight) {
    //     this.velocity.y = this.gravity;
    //   }
    // }

    //detect right wall collision
    if (this.position.x + this.size.width >= CANVAS_DIMENSIONS.CANVAS_WIDTH) {
      this.position.x = CANVAS_DIMENSIONS.CANVAS_WIDTH - this.size.width;
    }

    if (this.position.y > this.initialY) {
      this.position.y = this.initialY;
    }

    if (!this.isJumping && this.position.y < this.initialY) {
      this.position.y += (this.gravity * deltaTime) / 16.67;
    }

    if (this.animationState == AnimationState.Run) {
      this.image.src = playerMoveImage;
      this.position.x += (this.velocity.x * deltaTime) / 16.67;
    }

    if (this.animationState == AnimationState.Idle) {
      this.image.src = playerIdleImage;
      this.isAttacking = false;
      this.isJumping = false;
    }

    if (this.animationState == AnimationState.Attack) {
      this.isAttacking = true;
      this.image.src = playerAttackImage;
    }

    if (this.animationState == AnimationState.moveUp && this.isJumping) {
      this.image.src = playerJumpImage;
      this.position.y += (this.velocity.y * deltaTime) / 16.67;
    }

    if (this.animationState == AnimationState.ThrowWeapon) {
      this.image.src = playerThrowImage;
    }

    if (this.animationState == AnimationState.Dead) {
      this.image.src = playerDeadImage;
      this.isDead = true;
    }
    if (this.position.x < 0) this.position.x = 0;

    // Handle platform collisions
    this.handlePlatformCollisions(platforms);

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
      if (this.animationFrameCount++ >= currentAnimationFrameRate) {
        this.animationFrameCount = 0;
        this.frameY = this.frameY + 1;

        if (this.frameY >= currentAnimationFrameRate) {
          this.frameY = currentAnimationFrameRate;
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

  handleCollision(): void {}
}
