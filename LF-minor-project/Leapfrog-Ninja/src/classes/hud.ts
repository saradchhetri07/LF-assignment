import { Scroll } from "./scroll";
import { BaseEnemy } from "./enemy";
import { Drawable, Updatable } from "../interfaces/interface";
import { Player } from "./player";
import { CANVAS_DIMENSIONS } from "../constants/constants";
import { assetsManager } from "./AssetsManager";

/**
 * Class representing the Heads-Up Display (HUD).
 */
export class HUD implements Drawable, Updatable {
  player: Player;
  baseEnemy: BaseEnemy;
  maxHealth: number = 100;
  time: number = 0;
  ninjaLife: number; // To display the ninja's life
  enemyLives: number[]; // To display the enemies' lives
  scroll: Scroll;

  /**
   * Create a new HUD.
   */
  constructor(player: Player, enemy: BaseEnemy) {
    this.player = player;
    this.baseEnemy = enemy;
    this.ninjaLife = 4; // Initialize ninja's life
    this.enemyLives = []; // Initialize enemies' lives
    this.scroll = new Scroll(0, 0, 1);
  }

  /**
   * Update the HUD's state.
   * @param {number} deltaTime - The time elapsed since the last update.
   */
  update(deltaTime: number): void {
    // Update HUD elements
    this.time += deltaTime;
  }

  /**
   * Draw the HUD on the canvas.
   * @param {CanvasRenderingContext2D} context - The drawing context.
   */

  draw(context: CanvasRenderingContext2D): void {
    // Draw the player icon and health bar at the top
    context.drawImage(this.player.playerHead, 20, 20, 80, 80);
    this.drawHealthBar(context, 20, 110, 200, 20, this.player.health);

    // Draw the enemy icon and health bar at the top
    context.drawImage(
      this.baseEnemy.enemyHead,
      CANVAS_DIMENSIONS.CANVAS_WIDTH - 80,
      20,
      80,
      80
    );
    this.drawHealthBar(
      context,
      CANVAS_DIMENSIONS.CANVAS_WIDTH - 220,
      110,
      200,
      20,
      this.baseEnemy.health
    );

    // Set the background color for the HUD at the bottom
    const hudHeight = 60;

    context.fillStyle = "black";
    context.fillRect(
      0,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT - hudHeight,
      CANVAS_DIMENSIONS.CANVAS_WIDTH,
      hudHeight
    );

    context.font = "30px sans-serif";
    context.fillStyle = "white";

    // Potion count and image
    context.fillText(
      `${this.player.getPotionCount()}`,
      CANVAS_DIMENSIONS.CANVAS_WIDTH / 2 - 40,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT - 20
    );
    context.drawImage(
      assetsManager.sprites.HEALTH_POTION,
      CANVAS_DIMENSIONS.CANVAS_WIDTH / 2 - 100,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT - 50,
      40,
      40
    );

    // Scroll count and image
    context.fillText(
      `${this.player.getScrollCount()}`,
      CANVAS_DIMENSIONS.CANVAS_WIDTH / 2 + 80,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT - 20
    );
    context.drawImage(
      this.scroll.image,
      CANVAS_DIMENSIONS.CANVAS_WIDTH / 2 + 10,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT - 60,
      60,
      60
    );

    // Kunai count and image
    context.fillText(
      `${this.player.kunaiCount}`,
      CANVAS_DIMENSIONS.CANVAS_WIDTH / 2 + 160,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT - 20
    );
    context.drawImage(
      this.player.kunaiImage,
      CANVAS_DIMENSIONS.CANVAS_WIDTH / 2 + 100,
      CANVAS_DIMENSIONS.CANVAS_HEIGHT - 60,
      30,
      60
    );
  }

  /**
   * Draw a health bar on the canvas.
   * @param {CanvasRenderingContext2D} context - The drawing context.
   * @param {number} x - The x position of the health bar.
   * @param {number} y - The y position of the health bar.
   * @param {number} width - The width of the health bar.
   * @param {number} height - The height of the health bar.
   * @param {number} health - The current health value.
   * @param {number} maxHealth - The maximum health value.
   * @param {string} label - The label for the health bar.
   */
  drawHealthBar(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    health: number
  ): void {
    // Draw the background of the health bar
    context.fillStyle = "grey";
    context.fillRect(x, y, width, height);

    // Create a gradient for the health bar
    const gradient = context.createLinearGradient(x, y, x + width, y);
    gradient.addColorStop(0, "indigo");
    gradient.addColorStop(1, "grey");

    // Calculate the width of the current health
    const currentHealthWidth = (health / this.maxHealth) * width;

    // Draw the current health
    context.fillStyle = gradient;
    context.fillRect(x, y, currentHealthWidth, height);

    // Draw the border of the health bar
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.strokeRect(x, y, width, height);
  }
}
