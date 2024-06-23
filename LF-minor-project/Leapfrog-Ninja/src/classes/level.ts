import { Drawable, Updatable } from "../interfaces/interface";
import { BaseEnemy } from "./enemy";
import { Obstacle } from "./obstacle";

/**
 * Class representing a game level.
 */
export class Level implements Drawable, Updatable {
  number: number = 1;
  subLevel: number = 0;
  backgroundImages: HTMLImageElement[];
  currentBackGroundIndex: number = 0;
  enemies: BaseEnemy[];
  kunaisCountOnPlatform: number = 4;

  // items: Item[];
  // obstacles: Obstacle[];

  /**
   * Create a new level.
   * @param {number} number - The level number.
   * @param {string} backgroundSrc - The source of the background image.
   * @param {Enemy[]} enemies - The enemies in the level.
   * @param {Item[]} items - The items in the level.
   * @param {Obstacle[]} obstacles - The obstacles in the level.
   */

  constructor(
    number: number,
    backgroundImages: HTMLImageElement[],
    enemies: BaseEnemy[]
    // items: Item[],
    // obstacles: Obstacle[]
  ) {
    this.number = number;
    this.backgroundImages = backgroundImages;
    this.enemies = enemies;
    // this.items = items;
    // this.obstacles = obstacles;
  }

  /**
   * Get the enemy for the current sub-level.
   * @returns {BaseEnemy} The enemy for the current sub-level.
   */
  getCurrentEnemy(): BaseEnemy {
    return this.enemies[this.subLevel];
  }

  //get current level
  getCurrentLevel(): number {
    return this.number;
  }

  //get kunais number to place onto the platform
  getKunaiOnPlatformNumber(): number {
    return this.kunaisCountOnPlatform;
  }

  /**
   * Draw the level on the canvas.
   * @param {CanvasRenderingContext2D} context - The drawing context.
   */
  draw(context: CanvasRenderingContext2D): void {
    const backgroundImage = this.backgroundImages[this.currentBackGroundIndex];
    context.drawImage(
      backgroundImage,
      0,
      0,
      context.canvas.width,
      context.canvas.height
    );
    // this.getCurrentEnemy().draw(context);
    // this.items.forEach((item) => item.draw(context));
    // this.obstacles.forEach((obstacle) => obstacle.draw(context));
  }
  // getBackLevelBackgroundImage(): HTMLImageElement {
  //   const backgroundImage = this.backgroundImages[this.currentBackGroundIndex];
  //   return backgroundImage;
  // }
  /**
   * Update the level's state.
   * @param {number} deltaTime - The time elapsed since the last update.
   */
  update(deltaTime: number): void {
    // this.getCurrentEnemy().update(deltaTime);
    // this.items.forEach((item) => item.update(deltaTime));
    // this.obstacles.forEach((obstacle) => obstacle.update(deltaTime));
    // this.checkCompletion();
  }

  /**
   * Check if the level is completed.
   */
  checkCompletion(): void {
    // Implement logic to check if the sub-level or level is completed
  }

  /**
   * Advance to the next sub-level.
   */
  nextSubLevel(): void {
    if (this.subLevel < this.backgroundImages.length - 1) {
      this.subLevel++;
      this.currentBackGroundIndex = this.subLevel;
    } else {
      console.log("All sub-levels completed!");
    }
  }

  /**
   * Restart the current sub-level.
   */
  restartSubLevel(): void {
    this.subLevel = 0;
    this.currentBackGroundIndex = 0;
    // Reset enemies, items, obstacles as needed
  }
}
