import { makeLevelEnemies } from "./../utils/levelEnemies";
import { Level } from "./level";

import {
  Level1Enemy1,
  Level1Enemy2,
  Level2Enemy1,
  Level2Enemy2,
  Level3Enemy1,
  Level3Enemy2,
  Level4Enemy1,
  Level4Enemy2,
} from "./levelEnemy";
import { BaseEnemy } from "./enemy";
import { makeLevelImages } from "../utils/levelImages";
import { Item } from "./item";
import { Obstacle } from "./obstacle";

/**
 * Class representing the level manager.
 */
export class LevelManager {
  private currentLevel: number;
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

  /**
   * Load the current level.
   * @returns {Level} - The current level.
   */
  loadCurrentLevel(): Level {
    console.log(`current level is ${this.currentLevel}`);
    return this.levels[this.currentLevel - 1];
  }

  /**
   * Advance to the next sub-level.
   */
  nextSubLevel(): void {
    const currentLevel = this.loadCurrentLevel();
    currentLevel.nextSubLevel();
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
