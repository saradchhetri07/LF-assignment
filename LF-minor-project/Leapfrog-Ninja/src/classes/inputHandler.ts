/**
 * Class representing the input handler for the game.
 */

import { AttackType, Character } from "../interfaces/interface";
import { Game } from "./game";

export class InputHandler {
  private character: Character;
  private keys: Set<string>;
  private keyStates: Map<string, boolean>;
  private controlSchema: { [key: string]: string };
  private game: Game;

  /**
   * Create a new input handler.
   * @param {Character} character - The character to control.
   * @param {Object} controlSchema - The mapping of keys to actions.
   * @param {Game} game - The game instance.
   */
  constructor(
    character: Character,
    controlSchema: { [key: string]: string },
    game: Game
  ) {
    this.character = character;
    this.keys = new Set();
    this.keyStates = new Map();
    this.controlSchema = controlSchema;
    this.game = game;

    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
    window.addEventListener("click", this.handleMouseClick.bind(this));
  }

  /**
   * Handle key down events.
   * @param {KeyboardEvent} event - The keyboard event.
   */
  private handleKeyDown(event: KeyboardEvent): void {
    if (!this.keyStates.get(event.key)) {
      this.keys.add(event.key);
      this.keyStates.set(event.key, true);
      this.processInput();
    }
  }

  /**
   * Handle key up events.
   * @param {KeyboardEvent} event - The keyboard event.
   */
  private handleKeyUp(event: KeyboardEvent): void {
    this.keys.delete(event.key);
    this.keyStates.set(event.key, false);
    this.processInput();
  }

  /**
   * Handle mouse click events.
   * @param {MouseEvent} event - The mouse event.
   */
  private handleMouseClick(event: MouseEvent): void {
    // Handle mouse click events
  }

  /**
   * Process the current input state.
   */
  private processInput(): void {
    let isMoving = false;
    for (let key of this.keys) {
      switch (this.controlSchema[key]) {
        case "moveLeft":
          this.character.move("moveLeft");
          isMoving = true;
          break;

        case "moveRight":
          this.character.move("moveRight");
          isMoving = true;
          break;

        case "moveUp":
          this.character.move("moveUp");
          isMoving = true;
          break;

        case "Attack":
          this.character.move("Attack");
          break;

        case "ThrowWeapon":
          this.character.move("ThrowWeapon");
          break;

        case "pause":
          this.game.togglePause();
          break;
      }
    }

    // If no movement keys are pressed, set the character to idle
    if (!isMoving && this.keys.size === 0) {
      this.character.move("idle");
    }
  }
}
