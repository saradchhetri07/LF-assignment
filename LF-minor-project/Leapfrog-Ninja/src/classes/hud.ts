import { BaseEnemy } from "./enemy";
import { Drawable, Updatable } from "../interfaces/interface";
import { Player } from "./player";
import { CANVAS_DIMENSIONS } from "../constants/constants";

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

  /**
   * Create a new HUD.
   */
  constructor(player: Player, enemy: BaseEnemy) {
    this.player = player;
    this.baseEnemy = enemy;
    this.ninjaLife = 4; // Initialize ninja's life
    this.enemyLives = []; // Initialize enemies' lives
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
    context.font = "30px sans-serif";
    context.fillStyle = "white";

    // // Draw score
    // context.fillText(`Score: ${this.score}`, 20, 30);

    // Draw time

    // Draw stars
    context.fillText(
      `${this.player.kunaiCount}`,
      CANVAS_DIMENSIONS.CANVAS_WIDTH / 2 + 8,
      90
    );

    context.drawImage(
      this.player.kunaiImage,
      CANVAS_DIMENSIONS.CANVAS_WIDTH / 2,
      90,
      30,
      60
    );

    // Draw player health bar
    context.drawImage(this.player.playerHead, 20, 20, 80, 80);

    this.drawHealthBar(context, 20, 110, 200, 20, this.player.health);

    context.drawImage(
      this.baseEnemy.enemyHead,
      CANVAS_DIMENSIONS.CANVAS_WIDTH - 80,
      20,
      80,
      80
    );

    // Draw enemy health bar
    this.drawHealthBar(
      context,
      CANVAS_DIMENSIONS.CANVAS_WIDTH - 220,
      110,
      200,
      20,
      this.baseEnemy.health
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
