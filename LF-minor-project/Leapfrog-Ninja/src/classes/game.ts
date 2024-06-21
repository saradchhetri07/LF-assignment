import { Kunai } from "./kunai";
import {
  CANVAS_DIMENSIONS,
  NINJA_CONSTANT,
  NINJA_SPRITE_IDLE,
} from "./../constants/constants";
import { Player } from "./player";
import { BaseEnemy } from "./enemy";
import { HUD } from "./hud";
import { InputHandler } from "./inputHandler";
import { LevelManager } from "./levelManager";

import playerRunImage from "../assets/Images/player/ninjaBoyRunning.png";
import { checkCollisions } from "../utils/collisionDetection";
import { AnimationState } from "../enums/animationStateEnum";
import { Assets } from "../utils/audioLoad";
import { drawPauseScreen } from "../utils/pauseScreen";
import { Drawable, Platform } from "../interfaces/interface";

/**
 * Class representing the main game.
 */
export class Game implements Drawable {
  private player: Player;
  private enemy: BaseEnemy; // Assuming one enemy
  private hud: HUD;
  private inputHandler1: InputHandler;
  private inputHandler2: InputHandler;
  private animationId: number = 0;
  private levelManager: LevelManager;
  private lastTime: number;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  isPaused: boolean = false; // Initialize isPaused to false
  private kunai: Kunai[] = [];
  private hasKunaiLeft: boolean = false;
  private assets: Assets;
  private animationFrameId: number | null;

  private ninjaPlatforms: Platform[] = [
    { x: 130, y: 226, width: 153, height: 12, level: 1 },
    { x: 450, y: 245, width: 75, height: 12, level: 1 },
    { x: 160, y: 275, width: 173, height: 12, level: 2 },
    { x: 470, y: 140, width: 128, height: 12, level: 2 },
    { x: 160, y: 275, width: 173, height: 12, level: 3 },
    { x: 470, y: 140, width: 128, height: 12, level: 3 },
    { x: 33, y: 197, width: 85, height: 20, level: 4 },
    { x: 530, y: 208, width: 140, height: 20, level: 4 },
    { x: 85, y: 162, width: 230, height: 25, level: 5 },
    { x: 430, y: 238, width: 230, height: 25, level: 5 },
  ];

  /**
   * Create a new game.
   * @param {HTMLCanvasElement} canvas - The canvas element to draw the game on.
   * @param {CanvasRenderingContext2D} context - The drawing context.
   * @param {Assets} assets - The loaded assets for the game.
   */
  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    assets: Assets
  ) {
    this.canvas = canvas;
    this.context = context;
    this.assets = assets;

    this.levelManager = new LevelManager();
    const currentLevel = this.levelManager.loadCurrentLevel();

    this.animationFrameId = null;
    this.isPaused = false;

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

    this.hud = new HUD(this.player, this.enemy);

    this.inputHandler1 = new InputHandler(
      this.player,
      {
        ArrowLeft: "moveLeft",
        ArrowRight: "moveRight",
        ArrowUp: "moveUp",
        a: "Attack",
        s: "ThrowWeapon",
        p: "pause",
      },
      this
    );

    this.inputHandler2 = new InputHandler(
      this.enemy,
      {
        j: "moveLeft",
        l: "moveRight",
        i: "moveUp",
        z: "Attack",
        x: "ThrowWeapon",
      },
      this
    );

    this.lastTime = 0;
  }

  /**
   * Start the game loop.
   */
  start(): void {
    this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  /**
   * Pause the game.
   */
  pause(): void {
    this.isPaused = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    drawPauseScreen(
      this.context,
      this.canvas,
      this.player.health,
      this.player.kunaiCount
    );
  }

  /**
   * Resume the game.
   */
  resume(): void {
    this.isPaused = false;
    this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this));
    const resumeButton = document.getElementById(
      "resumeButton"
    ) as HTMLButtonElement;
    if (resumeButton) {
      resumeButton.style.display = "none";
    }
  }

  /**
   * Toggle the pause state of the game.
   */
  togglePause(): void {
    console.log("came to toggle pause");

    if (this.isPaused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  /**
   * The main game loop.
   * @param {number} timestamp - The current time.
   */
  private gameLoop(timestamp: number): void {
    if (this.isPaused) return; // Early exit if paused

    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.draw();
    this.update(deltaTime);
    this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this)); // Store the animation frame ID
  }

  /**
   * Update the game state.
   * @param {number} deltaTime - The time elapsed since the last update.
   */
  update(deltaTime: number): void {
    this.player.draw(this.context);
    this.player.update(deltaTime, this.ninjaPlatforms);

    if (!this.enemy.isDead) {
      this.enemy.draw(this.context);
    }
    this.enemy.update(deltaTime);

    this.handleCollisions();
    this.updateKunais(deltaTime);
    this.hud.draw(this.context);
  }

  /**
   * Handle collisions between game objects.
   */
  private handleCollisions(): void {
    if (
      !this.player.isDead &&
      !this.enemy.isDead &&
      checkCollisions(this.player, this.enemy)
    ) {
      if (this.player.isAttacking && this.legitHit()) {
        console.log(this.enemy.health);
        this.enemy.decreaseHealth(this.player.damageLevel);
      }
      if (this.enemy.isAttacking && this.legitHit()) {
        this.player.decreaseHealth(this.enemy.damageLevel);
      }
    }
  }

  /**
   * Update and draw each kunai weapon.
   * @param {number} deltaTime - The time elapsed since the last update.
   */
  private updateKunais(deltaTime: number): void {
    if (
      this.player.animationState == AnimationState.ThrowWeapon &&
      !this.hasKunaiLeft &&
      this.player.kunaiCount > 0
    ) {
      const newKunai = new Kunai(
        this.player.position.x +
          (this.player.isTurningRight ? this.player.size.width : 0),
        this.player.position.y + this.player.size.height / 2.5,
        this.player.kunaiCount,
        this.player.isTurningRight
      );
      this.kunai.push(newKunai);
      this.player.kunaiCount--;
      this.hasKunaiLeft = true;
    }

    this.kunai.forEach((kunai, index) => {
      kunai.update(deltaTime, this.player.isTurningRight);
      kunai.display(this.context);

      if (
        kunai.position.x < 0 ||
        kunai.position.x > CANVAS_DIMENSIONS.CANVAS_WIDTH ||
        checkCollisions(kunai, this.enemy)
      ) {
        this.hasKunaiLeft = false;
        this.kunai.splice(index, 1);
        if (checkCollisions(kunai, this.enemy)) {
          this.enemy.decreaseHealth(kunai.damageLevel);
        }
      }
    });
  }

  /**
   * Determine if the hit is legitimate based on direction.
   * @returns {boolean} - True if the hit is legitimate, false otherwise.
   */
  private legitHit(): boolean {
    return !(this.player.isTurningLeft && this.enemy.isTurningRight);
  }

  /**
   * Draw the game state to the canvas.
   */
  draw(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const currentLevel = this.levelManager.loadCurrentLevel();
    currentLevel.draw(this.context);
  }
}
