import { makeLevelEnemies } from "./../utils/levelEnemies";
import { Level } from "./level";

import { BaseEnemy } from "./enemy";
import { makeLevelImages } from "../utils/levelImages";

/**
 * Class representing the level manager.
 */
export class LevelManager {
  private currentLevel: number = 1;
  private levels: Level[];
  private enemies: BaseEnemy[][];
  // private levelItems: Item[];
  // private levelObstacle: Obstacle[];
  private levelImages: { [key: string]: HTMLImageElement[] };

  constructor() {
    this.currentLevel = 1;
    this.levelImages = makeLevelImages();
    this.enemies = makeLevelEnemies;
    this.levels = this.makeLevelAttributes();
    // this.levelItems = this.makeLevelObstacles();
    // this.levelObstacle = this.makeLevelObstacle;
  }

  makeLevelAttributes(): Level[] {
    const localLevels: Level[] = [];

    for (let level = 1; level <= 4; level++) {
      const levelKey = `level${level}`;
      const newLevel = new Level(
        level,
        this.levelImages[levelKey],
        this.enemies[level - 1]
      );
      localLevels.push(newLevel);
    }
    return localLevels;
  }

  //print all the level for debugging
  printAllLevel(): void {
    // this.levels.forEach((level) => {
    //   console.log("level is", level);
    // });
  }

  /**
   * Load the current level.
   * @returns {Level} - The current level.
   */
  loadCurrentLevel(): Level {
    return this.levels[this.currentLevel - 1];
  }

  getCurrentLevel(): number {
    return this.currentLevel;
  }

  /**
   * Advance to the next sub-level.
   */
  nextSubLevel(): void {
    const currentLevel = this.loadCurrentLevel();
    currentLevel.nextSubLevel();
  }

  incrementLevel(): void {
    this.currentLevel++;
  }

  /**
   * Advance to the next level.
   */
  nextLevel(): void {
    if (this.currentLevel < this.levels.length) {
      this.currentLevel++;
    } else {
      console.log("You have completed all levels!");
    }
  }

  /**
   * Restart the current level.
   */
  restartLevel(): void {
    this.levels[this.currentLevel - 1].restartSubLevel();
  }
}
