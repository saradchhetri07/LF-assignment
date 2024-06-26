import { Size } from "./../interfaces/interface";
import { ICharacter, Position } from "../interfaces/interface";
import { getEnemySprite } from "../utils/getEnemySprite";

import { CANVAS_DIMENSIONS } from "../constants/constants";
import { Player } from "./player";
import { assetsManager } from "./AssetsManager";

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
export class BaseEnemy implements ICharacter {
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
  lastDamageTime: number = 0;
  damageCooldown: number = 1000; // 1000 milliseconds = 1 second
  initialY: number;
  animationState: AnimationState;
  animationFrameRate: number;
  animationFrameCount: number;
  velocity: { x: number; y: number };
  isJumping: boolean;
  isAttacking: boolean = false;
  isTurningLeft: boolean = true;
  isTurningRight: boolean = false;
  type: string;
  isOnGround: boolean = true;
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

    this.health = health;
    this.maxHealth = 10;
    this.power = power;
    this.damageLevel = damageLevel;
    this.type = type;

    this.image = new Image();
    this.image.src = imageSrc;
    this.enemyHead = new Image();
    this.enemyHead.src = imageHeadSrc;

    this.isJumping = false;
    this.isAttacking = false;

    this.animationState = AnimationState.Idle;
    this.animationFrameRate = 10; // Adjust based on your needs
    this.animationFrameCount = 0;
    this.verticalFrameTimer = null;
    // this.startThrowWeaponTimer();

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
   * Start the timer to change the animation state to ThrowWeapon after 10 seconds.
   */
  // private startThrowWeaponTimer(): void {
  //   if (this.throwWeaponTimer) {
  //     clearTimeout(this.throwWeaponTimer);
  //   }

  //   this.throwWeaponTimer = window.setTimeout(() => {
  //     this.animationState = AnimationState.ThrowWeapon;
  //     this.updateAnimation();
  //   }, 10000); // 10 seconds
  // }

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
        console.log("move throw weapon");
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
    this.isTurningLeft = true;
    this.isTurningRight = false;
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
    this.frameX = 0;
    this.animationState = AnimationState.Run;
    this.updateAnimation();
  }

  /**
   * Make the enemy jump.
   */
  private jump(): void {
    if (!this.isJumping) {
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
    console.log("throw weapon animation state changed");
    this.updateAnimation();
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

    // // Draw the rectangle around the enemy's image
    // context.strokeStyle = "red";
    // context.strokeRect(
    //   this.position.x,
    //   this.position.y,
    //   this.size.width,
    //   this.size.height
    // );
  }

  hitEffect(attackFromLeft: boolean): void {
    if (attackFromLeft) {
      this.position.x -= 4;
    } else {
      this.position.x += 4;
    }
  }
  /**
   * Decrease the enemy's health when hit by an opponent.
   * @param {number} damage - The amount of damage to inflict.
   */
  decreaseHealth(damage: number): void {
    // const currentTime = Date.now();

    // if (this.health <= 0) {
    //   this.health = 0;
    //   this.animationState = AnimationState.Dead;
    // }

    // // Check if enough time has passed since the last damage
    // if (currentTime - this.lastDamageTime >= this.damageCooldown) {
    //   this.health -= damage;
    //   this.lastDamageTime = currentTime; // Update the last damage time
    // } else {
    //   console.log(`Damage cooldown active. Health: ${this.health}`);
    // }
    this.health -= damage;
    if (this.health <= 0) {
      this.health = 0;
      this.animationState = AnimationState.Dead;
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
    if (this.health <= 0) {
      this.animationState = AnimationState.Dead;
    }
    //if player is on the ground change some boolean values
    if (this.position.y >= this.initialY) {
      this.isOnGround = true;
    }

    // //ifplayer reaches max height
    if (this.position.y <= this.jumpHeight) {
      this.velocity.y = -this.gravity;
      this.isJumping = false;
    }

    // if (this.isJumping) {
    //   this.position.y += (this.velocity.y * deltaTime) / 16.67;
    //   if (this.position.y <= this.initialY - this.jumpHeight) {
    //     this.velocity.y = this.gravity;
    //   }
    // }
    console.log("current animation state is", this.animationState);

    // if (!this.isJumping && this.position.y < this.initialY) {
    //   this.position.y += (this.gravity * deltaTime) / 16.67;
    // }

    //dont let player go out of  ground position
    if (this.position.y > this.initialY) {
      this.position.y = this.initialY;
    }

    if (!this.isJumping && this.position.y < this.initialY) {
      this.position.y += (this.gravity * deltaTime) / 16.67;
    }

    if (this.animationState == AnimationState.Run && this.isTurningRight) {
      this.image = getEnemySprite(this.type, "Run");
      this.position.x += (this.velocity.x * deltaTime) / 25;
    }

    if (this.animationState == AnimationState.Run && !this.isTurningRight) {
      this.image = getEnemySprite(this.type, "Run");
      this.position.x -= (this.velocity.x * deltaTime) / 25;
    }

    if (this.animationState == AnimationState.Idle) {
      if (assetsManager.getSoundStatus() && this.type == "level_2_Sublevel_1") {
        const orkSound = assetsManager.audios.ORKSOUND;
        orkSound.play();
      } else if (
        assetsManager.getSoundStatus() &&
        this.type == "level_3_Sublevel_1"
      ) {
        const dangerSound = assetsManager.audios.DANGER;
        dangerSound.play();
      } else if (
        assetsManager.getSoundStatus() &&
        this.type == "level_4_Sublevel_1"
      ) {
        const earthCracking = assetsManager.audios.EARTHCRACKING;
        earthCracking.play();
      }

      this.isAttacking = false;
      this.isJumping = false;
      this.image = getEnemySprite(this.type, "Idle");
    }

    if (this.animationState == AnimationState.Attack) {
      if (assetsManager.getSoundStatus() && this.type == "level_2_Sublevel_1") {
        const orkSound = assetsManager.audios.ORKGROAN;
        orkSound.play();
      }
      this.isAttacking = true;
      this.image = getEnemySprite(this.type, "Attack");
    }

    if (this.animationState == AnimationState.moveUp) {
      this.image = getEnemySprite(this.type, "moveUp");
      this.position.y += (8 * deltaTime) / 16.67;
    }

    if (
      this.animationState == AnimationState.ThrowWeapon &&
      this.type == "level_2_Sublevel_1"
    ) {
      if (assetsManager.getSoundStatus()) {
        const orkSound = assetsManager.audios.THROW;
        orkSound.play();
      }
      this.image = getEnemySprite(this.type, "ThrowWeapon")!;
      console.log("inside update to change the throw state");
    }

    if (this.animationState == AnimationState.Dead) {
      this.isDead = true;
      this.isAttacking = false;
      this.image = getEnemySprite(this.type, "Dead");
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
   * Automate enemy behavior to interact with the player.
   */
  automateBehavior(player: Player): void {
    // Calculate the distance between the enemy and the player
    const distanceToPlayer =
      player.position.x - this.position.x + player.size.width / 3;

    // Move towards the player if not close enough to attack
    if (Math.abs(distanceToPlayer) > this.size.width) {
      if (distanceToPlayer > 0) {
        this.move("moveRight");
      } else {
        this.move("moveLeft");
      }
    } else {
      setTimeout(() => {
        this.move("Attack");
      }, 3000);
    }
  }

  /**
   * Update the enemy's animation.
   */
  private updateAnimation(): void {
    const { maxFrame, animationFrameRate } =
      this.animationSettings[this.animationState];
    this.maxFrame = maxFrame;

    const currentAnimationFrameRate =
      this.animationState === AnimationState.Attack
        ? this.animationSettings[AnimationState.Attack].animationFrameRate
        : animationFrameRate;

    if (this.animationState == AnimationState.Attack) {
      this.handleVerticalAnimation(animationFrameRate);
    } else if (this.animationState == AnimationState.Dead) {
      this.handleDeadAnimation(animationFrameRate);
    } else {
      this.handleRegularAnimation(currentAnimationFrameRate);
    }
  }

  //reappear enemy with added health
  reappearEnemy(ctx: CanvasRenderingContext2D): void {
    if (this.type == "level_2_Sublevel_1") {
      // Set a timeout to clear the enemy after 3 seconds
      setTimeout(() => {
        ctx.drawImage(
          assetsManager.sprites.AURA,
          this.position.x,
          this.position.y + this.size.height,
          this.size.width,
          this.size.height * 0.2
        );
        ctx.drawImage(
          this.image,
          this.position.x,
          this.position.y + this.size.height
        );
      }, 3000);

      ctx.clearRect(
        this.position.x,
        this.position.y,
        this.size.width,
        this.size.height * 0.2
      );
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
