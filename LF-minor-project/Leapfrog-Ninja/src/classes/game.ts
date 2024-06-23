import { Kunai } from "./kunai";
import {
  CANVAS_DIMENSIONS,
  NINJA_CONSTANT,
  NINJA_SPRITE_IDLE,
} from "./../constants/constants";
import ninjaMaleCharacter from "../assets/Images/gameplay/maleCharacter.png";
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
import { levelCompleted } from "../utils/levelCompleted";
import { Scroll } from "./scroll";
import { Mode } from "../enums/mode";
import { HealthPotion } from "./healthPotion";

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
  private kunaiClass?: Kunai;

  private hasKunaiLeft: boolean = false;
  private animationFrameId: number | null;

  private mode: Mode; // Add mode property

  private scroll?: Scroll;
  private healthPotion?: HealthPotion;

  private ninjaPlatforms: Platform[] = [
    // this.context.strokeRect(520, 320, 75, 12);
    { x: 150, y: 300, width: 160, height: 12, level: 1, forPlacingKunai: true },
    { x: 520, y: 320, width: 75, height: 12, level: 1, forPlacingKunai: false },

    {
      x: 190,
      y: 368,
      width: 150,
      height: 18,
      level: 2,
      forPlacingKunai: true,
    },

    {
      x: CANVAS_DIMENSIONS.CANVAS_WIDTH / 2,
      y: CANVAS_DIMENSIONS.CANVAS_HEIGHT / 2,
      width: 128,
      height: 12,
      level: 2,
      forPlacingKunai: false,
    },

    {
      x: 160,
      y: 275,
      width: 173,
      height: 12,
      level: 2,
      forPlacingKunai: false,
    },
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
    mode: Mode
  ) {
    this.canvas = canvas;
    this.context = context;
    this.mode = mode;

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
      100,
      currentLevel.getCurrentLevel()
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
    this.makeKunaiOnPlatform();
    this.lastTime = 0;
    this.makeScroll();
    this.makeHealthPotion();
  }

  private makeHealthPotion(): void {
    const healthPotion = new HealthPotion(0, 0, 1);
    healthPotion.makeHealthPotion(this.ninjaPlatforms);
  }

  makeScroll(): void {
    console.log("making scroll");
    this.scroll = new Scroll(0, 0, 1);
    this.scroll?.makeScroll(this.ninjaPlatforms);
  }

  /**
   *
   * Initialize the current level.
   */
  reInitializeLevel(): void {
    const currentLevel = this.levelManager.loadCurrentLevel();

    this.enemy = currentLevel.getCurrentEnemy();

    this.hud = new HUD(this.player, this.enemy);

    //clearing kunais of previous level and making it again for new level
    this.kunaiClass?.clearkunais();
    this.kunaiClass?.incrementKunaiLevel();
    this.kunaiClass?.makeKunai(this.ninjaPlatforms, 3);

    //clearing scroll of previous level and making it again for new level
    this.scroll?.clearScroll();
    this.scroll?.incrementScrollLevel();
    this.scroll?.makeScroll(this.ninjaPlatforms);

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
   * Draw all the platforms with a red border.
   */
  private drawPlatforms(): void {
    this.context.strokeStyle = "red";
    this.context.lineWidth = 2;

    if (this.levelManager.getCurrentLevel() == 1) {
      this.context.strokeRect(150, 300, 160, 12);
      this.context.strokeRect(520, 320, 75, 12);
    }
    if (this.levelManager.getCurrentLevel() == 2) {
      this.context.strokeRect(190, 368, 200, 18);
    }
  }

  private makeKunaiOnPlatform() {
    // Instantiate kunaiClass
    this.kunaiClass = new Kunai(0, 0, 0, false, 1);
    this.kunaiClass?.makeKunai(this.ninjaPlatforms, 3);
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
    if (!this.enemy.isDead) {
      this.enemy.draw(this.context);
    } else {
      if (this.player.isScrollCollected) {
        levelCompleted(
          this.context,
          this.canvas,
          this.startNextLevel.bind(this)
        );
        return;
      }
    }

    this.kunaiIsPicked();

    this.scrollIsPicked();

    //bot movement
    if (this.mode == Mode.Computer) {
      this.enemy.automateBehavior(this.player);
    }

    this.player.draw(this.context);
    this.player.update(deltaTime, this.ninjaPlatforms);

    this.enemy.update(deltaTime);

    this.drawPlatforms();
    this.kunaiClass?.placeKunai(this.context);

    this.handleCollisions();
    this.updateKunais(deltaTime);
    this.hud.draw(this.context);

    this.scroll?.display(this.context);

    //make draw healthPotion
    this.healthPotion?.display(this.context);
    this.isHealthPotionPickedUp();
  }

  //check if the player is on the platform so as to collect the kunais
  private kunaiIsPicked(): void {
    if (this.player.isOnPlatform) {
      //check if he is picking the kunais
      this.kunaiClass?.kunaisOnPlatform.forEach((kunai, i) => {
        if (checkCollisions(this.player, kunai)) {
          this.player.kunaiCount++;
          this.kunaiClass?.kunaisOnPlatform.splice(i, 1);
        }
      });
    }
  }

  private isHealthPotionPickedUp(): void {
    this.healthPotion?.healthPotions.forEach((healthPotion, i) => {
      if (checkCollisions(this.player, healthPotion)) {
        this.player.health = 100;
        this.healthPotion?.healthPotions.splice(i, 1);
      }
    });
  }

  private scrollIsPicked(): void {
    if (this.player.isOnPlatform) {
      //check if he is picking the kunais
      this.scroll?.localScroll.forEach((kunai, i) => {
        if (checkCollisions(this.player, kunai)) {
          this.scroll?.localScroll.splice(i, 1);
          this.player.increaseScrollCount();
          this.player.isScrollCollected = true;
        }
      });
    }
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
        this.player.isTurningRight,
        this.levelManager.getCurrentLevel()
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
        this.enemy.hitEffect(this.player.isTurningLeft);
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
    const currentLevel = this.levelManager.loadCurrentLevel();
    currentLevel.draw(this.context);
  }

  /**
   * Start the next level.
   */
  startNextLevel(): void {
    const button = document.getElementById("nextLevelButton");
    if (button) {
      button.remove();
    }

    this.context.clearRect(
      0,
      0,
      CANVAS_DIMENSIONS.CANVAS_WIDTH,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT
    );

    this.player.reset(); // Add a reset method to reset player start
    this.player.increaseLevel();

    this.levelManager.incrementLevel();

    this.levelManager.printAllLevel();
    this.reInitializeLevel();

    this.start();
  }
}
