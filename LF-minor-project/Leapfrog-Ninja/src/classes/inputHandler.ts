import { AttackType, ICharacter } from "../interfaces/interface";
import { Game } from "./game";

export class InputHandler {
  private character: ICharacter;
  private keys: Set<string>;
  private keyStates: Map<string, boolean>;
  private controlSchema: { [key: string]: string };
  private game: Game;
  private attackCooldown: number = 0; //  attackCooldown

  constructor(
    character: ICharacter,
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

  private handleKeyDown(event: KeyboardEvent): void {
    // Ignore the keydown event if the key is already being processed
    if (!this.keyStates.get(event.key)) {
      this.keys.add(event.key);
      this.keyStates.set(event.key, true);
      this.processInput();
    }
  }

  private handleKeyUp(event: KeyboardEvent): void {
    this.keys.delete(event.key);
    this.keyStates.set(event.key, false);
    this.processInput();
  }

  private handleMouseClick(event: MouseEvent): void {
    // Handle mouse click events
  }

  private processInput(): void {
    const currentTime = Date.now();

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
          // Implement cooldown mechanism
          if (currentTime - this.attackCooldown > 500) {
            this.character.move("Attack");
            this.attackCooldown = currentTime;
          }
          break;

        case "ThrowWeapon":
          console.log("input handler throw weapon");

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
