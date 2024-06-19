import { gameState } from "./../interfaces/interface";
import {
  CANVAS_DIMENSIONS,
  NINJA_CONSTANT,
  NINJA_SPRITE_IDLE,
} from "./../constants/constants";
import { DIMENSIONS } from "./../../../../LF-assignment-5-car-collision/Collision/src/constants";
import { Player } from "./player";
import { BaseEnemy } from "./enemy";
import { HUD } from "./hud";
import { InputHandler } from "./inputHandler";
import { SoundManager } from "./soundManager";
import { LevelManager } from "./levelManager";
import { Drawable, Updatable } from "../interfaces/interface";
import playerIdleImage from "../assets/Images/player/ninjaBoyIdle.png";
import playerRunImage from "../assets/Images/player/ninjaBoyRunning.png";
/**
 * Class representing the main game.
 */
export class Game implements Drawable {
  //steps to perform in game class
  //check current level
  //change the background as per current level;
  //initialize all the enemies of current level with power and player with 100 % health
  //intialize the HUD
  private player: Player;
  private enemy: BaseEnemy; // Assuming you have one enemy for demonstration
  gameState = gameState.isActive;
  private hud: HUD;
  private inputHandler1: InputHandler;
  private inputHandler2: InputHandler;
  private soundManager: SoundManager;
  private animationId: number = 0;
  private levelManager: LevelManager;

  private lastTime: number;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  /**
   * Create a new game.
   * @param {HTMLCanvasElement} canvas - The canvas element to draw the game on.
   * @param {CanvasRenderingContext2D} context - The drawing context.
   */
  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;

    this.levelManager = new LevelManager();
    const currentLevel = this.levelManager.loadCurrentLevel();

    this.player = new Player(
      {
        x: NINJA_CONSTANT.HORIZONTAL_OFFSET,
        y:
          CANVAS_DIMENSIONS.CANVAS_HEIGHT -
          NINJA_CONSTANT.PLAYER_HEIGHT -
          NINJA_CONSTANT.VERTICAL_OFFSET,
      },
      {
        width: NINJA_SPRITE_IDLE.WIDTH / NINJA_SPRITE_IDLE.COLUMN,
        height: NINJA_SPRITE_IDLE.HEIGHT / NINJA_SPRITE_IDLE.ROWS,
      },
      playerRunImage,
      NINJA_SPRITE_IDLE.MAX_FRAME,
      100
    );

    this.enemy = currentLevel.getCurrentEnemy();

    console.log(`enemy is ${this.enemy}`);

    this.hud = new HUD(this.player, this.enemy);

    this.inputHandler1 = new InputHandler(this.player, {
      ArrowLeft: "moveLeft",
      ArrowRight: "moveRight",
      ArrowUp: "moveUp",
      a: "Attack",
      s: "ThrowWeapon",
      // d: "Poke",
    });

    this.inputHandler2 = new InputHandler(this.enemy, {
      j: "moveLeft",
      l: "moveRight",
      i: "moveUp",
      z: "Attack",
      x: "ThrowWeapon",
      // c: "Poke",
    });

    this.soundManager = new SoundManager();
    this.lastTime = 0;
  }

  /**
   * Start the game loop.
   */
  start(): void {
    if (this.gameState == gameState.isActive) {
      requestAnimationFrame(this.gameLoop.bind(this));
    }
  }

  /**
   * The main game loop.
   * @param {number} timestamp - The current time.
   */
  private gameLoop(timestamp: number): void {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.draw();
    this.update(deltaTime);
    this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  /**
   * Update the game state.
   * @param {number} deltaTime - The time elapsed since the last update.
   */
  update(deltaTime: number): void {
    this.player.draw(this.context);
    this.player.update(deltaTime);

    this.enemy.draw(this.context);
    this.enemy.update(deltaTime);

    if (
      !this.player.isDead &&
      !this.enemy.isDead &&
      this.checkCollisions() &&
      this.player.isAttacking &&
      this.legitHit()
    ) {
      console.log(this.enemy.health);
      this.enemy.decreaseHealth(this.player.damageLevel);
    }

    if (
      !this.player.isDead &&
      !this.enemy.isDead &&
      this.checkCollisions() &&
      this.enemy.isAttacking &&
      this.legitHit()
    ) {
      console.log("health is", this.player.health);
      this.player.decreaseHealth(this.enemy.damageLevel);
    }

    //game over if player is dead
    if (this.player.isDead) {
      //stop the game
      cancelAnimationFrame(this.animationId);
    }

    //draw HUD at the top
    this.hud.draw(this.context);
  }

  legitHit(): boolean {
    if (this.player.isTurningLeft && this.enemy.isTurningRight) {
      return false;
    }
    return true;
  }
  /**
   * Draw the game state to the canvas.
   */
  draw(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //this method will get the current level
    const currentLevel = this.levelManager.loadCurrentLevel();
    currentLevel.draw(this.context);
  }

  /**
   * Check for collisions between game objects.
   */
  private checkCollisions(): boolean {
    // Implement collision detection and handling logic
    if (
      this.player.position.x < this.enemy.position.x + this.enemy.size.width &&
      this.player.position.x + this.player.size.width > this.enemy.position.x &&
      this.player.position.y < this.enemy.position.y + this.enemy.size.height &&
      this.player.position.y + this.player.size.height > this.enemy.position.y
    ) {
      // Collision detected!
      return true;
    }
    return false;
  }
}
