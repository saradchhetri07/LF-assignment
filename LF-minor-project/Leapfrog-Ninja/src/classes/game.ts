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

import { checkCollisions } from "../utils/collisionDetection";
import { AnimationState } from "../enums/animationStateEnum";
import { drawPauseScreen } from "../utils/pauseScreen";
import { Drawable, Platform } from "../interfaces/interface";
import { levelCompleted } from "../utils/levelCompleted";
import { Scroll } from "./scroll";
import { HealthPotion } from "./healthPotion";
import { GameMode } from "../enums/mode";
import { Character } from "../enums/character";
import { GameDifficulty } from "../enums/difficulty";
import { assetsManager } from "./AssetsManager";
import { SoundMode } from "../enums/sound";
import { Weapon } from "./Weapon";

/**
 * Class representing the main game.
 */
export class Game implements Drawable {
  private player: Player;
  private enemy: BaseEnemy; // Assuming one enemy
  private hud: HUD;
  private damageFactor?: number; // factor of damage
  private inputHandler1: InputHandler;
  private inputHandler2: InputHandler;
  private animationId: number = 0;
  private levelManager: LevelManager;
  private lastTime: number;
  private enemyWeaponLeft: boolean = false;

  private timerCounter: number = 0;

  private canvas: HTMLCanvasElement;

  private chosenCharacter: Character = Character.Male;
  private difficultyMode: GameDifficulty = GameDifficulty.Easy;

  private context: CanvasRenderingContext2D;
  isPaused: boolean = false; // Initialize isPaused to false
  private soundModeStatus: SoundMode = SoundMode.ON;
  private kunai: Kunai[] = [];
  private kunaiClass?: Kunai;
  private playerKunaiLeft: boolean = false;
  private animationFrameId: number | null;
  private mode: GameMode; // Add mode property
  private scroll?: Scroll;
  private enemyWeapon?: Weapon[] = [];
  private healthPotion?: HealthPotion;
  private ninjaPlatforms: Platform[] = [
    { x: 200, y: 300, width: 200, height: 12, level: 1, forPlacingKunai: true },
    { x: 650, y: 320, width: 80, height: 12, level: 1, forPlacingKunai: false },
    { x: 250, y: 368, width: 230, height: 18, level: 2, forPlacingKunai: true },
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
      level: 3,
      forPlacingKunai: false,
    },
    { x: 160, y: 275, width: 173, height: 12, level: 3, forPlacingKunai: true },
  ];

  /**
   * Create a new game.
   * @param {HTMLCanvasElement} canvas - The canvas element to draw the game on.
   * @param {CanvasRenderingContext2D} context - The drawing context.
   * @param {GameMode} mode - The game mode.
   * @param {Character} chosenCharacter - The chosen character.
   * @param {GameDifficulty} difficultyMode - The difficulty mode.
   * @param {SoundMode} soundModeStatus - The sound mode status.
   */
  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    mode: GameMode,
    chosenCharacter: Character,
    difficultyMode: GameDifficulty,
    soundModeStatus: SoundMode
  ) {
    this.canvas = canvas;
    this.context = context;
    this.mode = mode;
    this.chosenCharacter = chosenCharacter;
    this.difficultyMode = difficultyMode;
    this.soundModeStatus = soundModeStatus;

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
      chosenCharacter == Character.Male
        ? assetsManager.sprites.NINJABOYJUMPING
        : assetsManager.sprites.NINJAGIRLJUMPING,
      NINJA_SPRITE_IDLE.MAX_FRAME,
      100,
      currentLevel.getCurrentLevel(),
      this.chosenCharacter,
      this.soundModeStatus
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
    this.makeHealthPotion();
    this.lastTime = 0;
    this.makeScroll();
    this.initSound();
  }

  private initSound() {
    assetsManager.toggleSound(this.soundModeStatus);
  }

  /**
   * Create health potions and place them on platforms.
   */
  private makeHealthPotion(): void {
    const healthPotion = new HealthPotion(0, 0, 1);
    healthPotion.makeHealthPotion(
      this.ninjaPlatforms,
      this.player.size.height,
      this.player.initialY
    );
    this.healthPotion = healthPotion;
  }

  /**
   * Create scrolls and place them on platforms.
   */
  makeScroll(): void {
    this.scroll = new Scroll(0, 0, 1);
    this.scroll?.makeScroll(this.ninjaPlatforms);
  }

  /**
   * Initialize the current level.
   */
  reInitializeLevel(): void {
    const currentLevel = this.levelManager.loadCurrentLevel();

    this.enemy = currentLevel.getCurrentEnemy();
    this.hud = new HUD(this.player, this.enemy);

    // Clear previous level items and create new ones for the new level
    this.kunaiClass?.clearkunais();
    this.kunaiClass?.incrementKunaiLevel();
    this.kunaiClass?.makeKunai(this.ninjaPlatforms, 3);

    this.scroll?.clearScroll();
    this.scroll?.incrementScrollLevel();
    this.scroll?.makeScroll(this.ninjaPlatforms);

    this.healthPotion?.healthPotions.splice(0);
    this.makeHealthPotion();

    this.inputHandler1 = new InputHandler(
      this.player,
      {
        ArrowLeft: "moveLeft",
        ArrowRight: "moveRight",
        ArrowUp: "moveUp",
        a: "Attack",
        s: "ThrowWeapon",
        p: "pause",
        t: "useHealthPotion",
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
    if (this.difficultyMode == GameDifficulty.Easy) {
      this.damageFactor = 2;
    } else if (this.difficultyMode == GameDifficulty.Medium) {
      this.damageFactor = 4;
    } else {
      this.damageFactor = 6;
    }

    const backgroundMusic = assetsManager.audios.BACKGROUND;
    if (this.soundModeStatus == SoundMode.ON) {
      backgroundMusic.loop = true;
      backgroundMusic.volume = 0.2;
      backgroundMusic.play();
    }

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

    if (this.levelManager.getCurrentLevel() === 1) {
      this.context.strokeRect(200, 300, 200, 12);
      this.context.strokeRect(650, 320, 80, 12);
    }
    if (this.levelManager.getCurrentLevel() === 2) {
      this.context.fillStyle = "green";
      this.context.strokeRect(250, 368, 230, 18);
      this.context.fillRect(
        CANVAS_DIMENSIONS.CANVAS_WIDTH / 2,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT / 2,
        128,
        20
      );
    }
  }

  /**
   * Create kunai and place them on platforms.
   */
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

    // if (this.enemy.health < 30 && this.enemy.type == "level_2_Sublevel_1") {
    //   // this.enemy.disappearEnemy(this.context);
    //   // this.enemy.reappearEnemy(this.context);
    //   this.enemy.health = 100;
    // }
    this.kunaiIsPicked();
    this.scrollIsPicked();

    // bot movement
    if (this.mode === GameMode.Computer) {
      this.enemy.automateBehavior(this.player);
    }

    this.player.draw(this.context);
    this.player.update(deltaTime, this.ninjaPlatforms);

    this.enemy.update(deltaTime);

    this.drawPlatforms();
    this.kunaiClass?.placeKunai(this.context);

    // check collison and attack status
    this.handleCollisions();

    // update kunais when thrown by player
    this.updateKunais(deltaTime);

    //update enemy when enemy hits x
    this.updateEnemyWeapon(deltaTime);

    // draw HUD at top
    this.hud.draw(this.context);

    // scroll display at the top of platform
    this.scroll?.display(this.context);

    // display health potion
    this.healthPotion?.display(this.context);

    this.isHealthPotionPickedUp();
  }

  /**
   * Check if the player is on the platform to collect kunais.
   */
  private kunaiIsPicked(): void {
    if (this.player.isOnPlatform) {
      this.kunaiClass?.kunaisOnPlatform.forEach((kunai, i) => {
        if (checkCollisions(this.player, kunai)) {
          if (this.soundModeStatus === SoundMode.ON) {
            assetsManager.audios.PICKUPKUNAI.play();
          }
          this.player.kunaiCount++;
          this.kunaiClass?.kunaisOnPlatform.splice(i, 1);
        }
      });
    }
  }

  /**
   * Check if the player picks up a health potion.
   */
  private isHealthPotionPickedUp(): void {
    this.healthPotion?.healthPotions.forEach((healthPotion, i) => {
      if (checkCollisions(this.player, healthPotion)) {
        if (this.soundModeStatus == SoundMode.ON) {
          const potionPickSound = assetsManager.audios.POTIONGRAB;
          potionPickSound.play();
          this.player.increasePotionCount();
        }
        this.healthPotion?.healthPotions.splice(i, 1);
      }
    });
  }

  /**
   * Check if the player picks up a scroll.
   */
  private scrollIsPicked(): void {
    this.scroll?.localScroll.forEach((scroll, i) => {
      if (checkCollisions(this.player, scroll)) {
        if (this.soundModeStatus === SoundMode.ON) {
          const scrollPickSound = assetsManager.audios.SCROLLGRAB;
          scrollPickSound.play();
        }
        this.scroll?.localScroll.splice(i, 1);
        this.player.increaseScrollCount();
        this.player.isScrollCollected = true;
      }
    });
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
      this.player.animationState === AnimationState.ThrowWeapon &&
      this.player.kunaiCount > 0 &&
      !this.playerKunaiLeft
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
    }

    this.kunai.forEach((kunai, index) => {
      kunai.update(deltaTime);
      kunai.display(this.context);
      this.playerKunaiLeft = true;

      if (checkCollisions(kunai, this.enemy)) {
        // this.hasKunaiLeft = false;
        this.enemy.hitEffect(this.player.isTurningLeft);
        this.kunai.splice(index, 1);
        this.enemy.decreaseHealth(kunai.damageLevel);
        this.playerKunaiLeft = false;
      }

      if (
        kunai.position.x < 0 ||
        kunai.position.y >= CANVAS_DIMENSIONS.CANVAS_WIDTH
      ) {
        this.playerKunaiLeft = false;
      }

      if (this.distanceBetweenKunai(kunai)) {
        this.playerKunaiLeft = false;
      }
    });
  }

  /**
   * Update and draw each kunai weapon.
   * @param {number} deltaTime - The time elapsed since the last update.
   */

  private updateEnemyWeapon(deltaTime: number): void {
    if (
      this.enemy.animationState === AnimationState.ThrowWeapon &&
      !this.enemyWeaponLeft
    ) {
      console.log("enemy throwing weapon");

      const weapon = new Weapon(
        this.enemy.position.x +
          (this.enemy.isTurningRight ? this.enemy.size.width / 2 : 0),
        this.enemy.position.y + this.enemy.size.height / 2,
        this.enemy.type,
        this.levelManager.getCurrentLevel(),
        this.enemy.isTurningRight
      );

      this.enemyWeapon?.push(weapon);
    }

    this.enemyWeapon?.forEach((weapon, index) => {
      weapon.update(deltaTime);
      weapon.display(this.context);
      this.enemyWeaponLeft = true;

      if (checkCollisions(weapon, this.player)) {
        this.enemyWeapon?.splice(index, 1);
        this.player.decreaseHealth(weapon.damageLevel);
        this.enemyWeaponLeft = false;
      }

      if (
        weapon.position.x < 0 ||
        weapon.position.y >= CANVAS_DIMENSIONS.CANVAS_WIDTH
      ) {
        this.enemyWeaponLeft = false;
      }

      if (this.distanceBetweenWeapon(weapon)) {
        this.enemyWeaponLeft = false;
      }
    });
  }

  private distanceBetweenWeapon(weapon: Weapon): boolean {
    let threshhold = 100;
    const dx = this.enemy.position.x - weapon.position.x;
    return Math.abs(dx) > threshhold;
  }

  private distanceBetweenKunai(kunai: Kunai): boolean {
    let threshhold = 250;
    const dx = this.player.position.x - kunai.position.x;
    return Math.abs(dx) > threshhold;
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
