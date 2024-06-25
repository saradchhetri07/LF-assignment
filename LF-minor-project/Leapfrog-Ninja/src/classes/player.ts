import { HealthPotion } from "./healthPotion";
import { assetsManager } from "./AssetsManager";
import {
  ICharacter,
  Position,
  Size,
  AttackType,
  Platform,
} from "../interfaces/interface";

import kunaiImage from "../assets/Images/player/kunaiDown.png";

import {
  CANVAS_DIMENSIONS,
  KUNAI_CONSTANT,
  NINJA_CONSTANT,
  NINJA_SPRITE_RUNNING,
} from "../constants/constants";
import { Kunai } from "./kunai";
import { Character } from "../enums/character";
import { SoundMode } from "../enums/sound";

enum AnimationState {
  Idle,
  Run,
  Attack,
  ThrowWeapon,
  Dead,
  moveUp,
}

interface AnimationSettings {
  image: HTMLImageElement;
  maxFrame: number;
  frameWidth: number;
  frameHeight: number;
  columns: number;
  rows: number;
  animationFrameRate: number;
}

export class Player implements ICharacter {
  private chosenCharater: Character = Character.Male;
  position: Position;
  damageLevel: number;
  size: Size;
  health: number;
  image: HTMLImageElement;
  power: number;
  maxHealth: number;
  kunaiCount: number = 20;
  frameX: number;
  frameY: number;
  maxFrame: number;
  velocity: { x: number; y: number };
  isJumping: boolean;
  soundStatus: SoundMode = SoundMode.ON;
  frameBuffer: number = 10;
  elapsedFrame: number = 0;
  potionCount: number = 0;

  private scrollCount: number = 0;
  isScrollCollected: boolean = false;

  animationState: AnimationState;
  animationFrameRate: number;
  animationFrameCount: number;
  level: number;
  isDead: boolean = false;
  gravity: number;
  isAttacking: boolean;
  jumpingForce: number = 12;
  playerHead: HTMLImageElement;
  kunaiImage: HTMLImageElement;
  kunaiWeapon: Kunai[] = [];
  isOnGround: boolean = true;
  isOnPlatform: boolean = false;
  isBoy: boolean = true;

  isTurningLeft: boolean = false;
  isTurningRight: boolean = true;

  initialY: number;
  private jumpHeight: number = 100;
  private verticalFrameTimer: number | null; // Timer for vertical movement
  private heightFactor: number = 1.1;
  private widthFactor: number = 0.6;
  private attackTimer: number = 0; // Add attackTimer

  private animationSettings: { [key in AnimationState]: AnimationSettings };

  constructor(
    position: Position,
    size: Size,
    imageSrc: HTMLImageElement,
    maxFrame: number,
    health: number,
    level: number,
    chosenCharacter: Character,
    soundStatus: SoundMode
  ) {
    chosenCharacter == Character.Male
      ? (this.isBoy = true)
      : (this.isBoy = false);
    this.position = position;
    this.size = size;
    this.playerHead = this.isBoy
      ? assetsManager.sprites.NINJABOYICON
      : assetsManager.sprites.NINJAGIRLICON;

    this.level = level;
    this.soundStatus = soundStatus;

    this.health = health;
    this.maxHealth = 100;

    this.image = imageSrc;
    this.kunaiImage = new Image();
    this.kunaiImage.src = kunaiImage;
    //kunai weapon declare

    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = maxFrame;

    this.power = 10;
    this.velocity = { x: 0, y: 0 };
    this.isJumping = false;

    this.damageLevel = 4; //out of 10

    this.animationState = AnimationState.Idle;
    this.animationFrameRate = 10; // Adjust based on needs
    this.animationFrameCount = 0;

    this.initialY = position.y;
    this.isAttacking = false;
    this.gravity = 9.8;

    this.verticalFrameTimer = null; // Initialize vertical frame timer
    this.animationSettings = {
      [AnimationState.Idle]: {
        image: this.isBoy
          ? assetsManager.sprites.NINJABOYJUMPING
          : assetsManager.sprites.NINJAGIRLJUMPING,
        maxFrame: 10,
        frameWidth: 262 / 2,
        frameHeight: 1400 / 10,
        columns: 2,
        rows: 10,
        animationFrameRate: 10, // Add this line
      },
      [AnimationState.Run]: {
        image: this.isBoy
          ? assetsManager.sprites.NINJABOYMOVING
          : assetsManager.sprites.NINJABOYMOVING,
        maxFrame: 10,
        frameWidth: 262 / 2,
        frameHeight: 1400 / 10,
        columns: 2,
        rows: 10,
        animationFrameRate: 10,
      },

      [AnimationState.Attack]: {
        image: this.isBoy
          ? assetsManager.sprites.NINJABOYATTACKING
          : assetsManager.sprites.NINJAGIRLATTACKING,
        maxFrame: 10,
        frameWidth: size.width,
        frameHeight: size.height,
        columns: 2,
        rows: 10,
        animationFrameRate: 10,
      },
      [AnimationState.ThrowWeapon]: {
        image: this.isBoy
          ? assetsManager.sprites.NINJABOYTHROWING
          : assetsManager.sprites.NINJAGIRLTHROWING,
        maxFrame: 10,
        frameWidth: size.width,
        frameHeight: size.height,
        columns: 2,
        rows: 10,
        animationFrameRate: 10,
      },
      [AnimationState.Dead]: {
        image: this.isBoy
          ? assetsManager.sprites.NINJABOYDEAD
          : assetsManager.sprites.NINJAGIRLDYING,
        maxFrame: 10,
        frameWidth: size.width,
        frameHeight: size.height,
        columns: 2,
        rows: 10,
        animationFrameRate: 10,
      },
      [AnimationState.moveUp]: {
        image: this.isBoy
          ? assetsManager.sprites.NINJABOYJUMPING
          : assetsManager.sprites.NINJAGIRLJUMPING,
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
        // if (this.isJumping) break;
        if (this.soundStatus == SoundMode.ON && this.kunaiCount > 0) {
          const movingAudio = assetsManager.audios.SWING;
          movingAudio.play();
        }

        this.isTurningLeft = true;
        this.isTurningRight = false;
        this.velocity.x = -8;
        this.frameX = 1;
        this.animationState = AnimationState.Run;
        break;

      case "moveRight":
        // if (this.isJumping) break;
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
        if (Date.now() - this.attackTimer > 500 || this.attackTimer == 0) {
          if (this.soundStatus == SoundMode.ON) {
            const swingSound = assetsManager.audios.SWING;
            swingSound.play();
          }
          this.animationState = AnimationState.Attack;
          this.attackTimer = Date.now(); // Reset the attackTimer
        }
        break;

      case "ThrowWeapon":
        if (this.soundStatus == SoundMode.ON) {
          const throwSound = assetsManager.audios.THROW;
          throwSound.play();
        }
        this.animationState = AnimationState.ThrowWeapon;
        break;

      case "useHealthPotion":
        if (this.health == 100) return;

        if (this.soundStatus == SoundMode.ON) {
          const drinkPotion = assetsManager.audios.DRINKPOTION;
          drinkPotion.play();
        }
        this.decreaseHealthPotion();
        this.health = 100;

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
      this.animationState == AnimationState.Attack
        ? this.size.width
        : this.size.width * this.widthFactor,
      this.animationState == AnimationState.Attack
        ? this.size.height * this.heightFactor
        : this.size.height
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

  //decrease health potion
  decreaseHealthPotion(): void {
    this.potionCount--;
  }

  increasePotionCount(): void {
    this.potionCount++;
  }

  getPotionCount(): number {
    return this.potionCount;
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
      if (
        platform.level == this.level &&
        this.position.x < platform.x + platform.width &&
        this.position.x + this.size.width > platform.x &&
        this.position.y < this.position.y + platform.height &&
        this.position.y + this.size.height > platform.y &&
        this.position.y + this.size.height < platform.y + platform.height
      ) {
        this.position.y = platform.y - this.size.height;
        this.velocity.y = 0;
        this.isJumping = false;
        this.isOnGround = false;
        this.isOnPlatform = true;
      }
    }
  }

  //increase level as player moves to next level
  increaseLevel(): void {
    this.level++;
  }

  //increase scroll collected count
  increaseScrollCount(): void {
    this.scrollCount++;
  }

  //getter for scroll count
  getScrollCount(): number {
    return this.scrollCount;
  }

  update(deltaTime: number, platforms: Platform[]): void {
    if (this.health <= 0) {
      this.animationState = AnimationState.Dead;
    }
    //if player is on the ground change some boolean values
    if (this.position.y >= this.initialY) {
      this.isOnGround = true;
      this.isOnPlatform = false;
    }

    // //ifplayer reaches max height
    if (this.position.y <= this.jumpHeight) {
      this.velocity.y = -this.gravity;
      this.isJumping = false;
    }

    //detect right wall collision
    if (this.position.x + this.size.width >= CANVAS_DIMENSIONS.CANVAS_WIDTH) {
      this.position.x = CANVAS_DIMENSIONS.CANVAS_WIDTH - this.size.width;
    }

    //dont let player go out of  ground position
    if (this.position.y > this.initialY) {
      this.position.y = this.initialY;
    }

    if (!this.isJumping && this.position.y < this.initialY) {
      this.position.y += (this.gravity * deltaTime) / 16.67;
    }

    if (this.animationState == AnimationState.Run) {
      this.image = this.isBoy
        ? assetsManager.sprites.NINJABOYRUNNING
        : assetsManager.sprites.NINJAGIRLRUNNING;
      this.position.x += (this.velocity.x * deltaTime) / 16.67;
    }

    if (this.animationState == AnimationState.Idle) {
      this.image = this.isBoy
        ? assetsManager.sprites.NINJABOYIDLE
        : assetsManager.sprites.NINJAGIRLIDLE;
      this.isAttacking = false;
      this.isJumping = false;
    }

    if (this.animationState == AnimationState.Attack) {
      (this.image = this.isBoy
        ? assetsManager.sprites.NINJABOYATTACKING
        : assetsManager.sprites.NINJAGIRLATTACKING),
        (this.isAttacking = true);
    }

    if (this.animationState == AnimationState.moveUp && this.isJumping) {
      this.position.y += (this.velocity.y * deltaTime) / 16.67;
    }

    if (this.animationState == AnimationState.ThrowWeapon) {
      this.image = this.isBoy
        ? assetsManager.sprites.NINJABOYTHROWING
        : assetsManager.sprites.NINJAGIRLTHROWING;
    }

    if (this.animationState == AnimationState.Dead) {
      this.image = this.isBoy
        ? assetsManager.sprites.NINJABOYDEAD
        : assetsManager.sprites.NINJAGIRLDEAD;
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
      this.elapsedFrame++;
      if (!this.verticalFrameTimer) {
        this.verticalFrameTimer = setTimeout(() => {
          if (this.elapsedFrame % this.frameBuffer == 0) {
            this.frameY =
              (this.frameY + 1) %
              this.animationSettings[this.animationState].rows;
          }
        }, 1000 / currentAnimationFrameRate); // Delay for the vertical frames
      }
      if (this.frameY == maxFrame) {
        this.elapsedFrame = 0;
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

  // In Player class
  reset(): void {
    this.position = {
      x: NINJA_CONSTANT.HORIZONTAL_OFFSET,
      y:
        CANVAS_DIMENSIONS.CANVAS_HEIGHT -
        NINJA_CONSTANT.PLAYER_HEIGHT -
        NINJA_CONSTANT.VERTICAL_OFFSET,
    };
    this.health = this.health; // Reset health or other properties
    this.kunaiCount = this.kunaiCount; // Reset kunai count
  }

  handleCollision(): void {}
}
