import { Game } from "../classes/game";
import { CANVAS_DIMENSIONS } from "../constants/constants";
import { Character } from "../enums/character";
import { GameDifficulty } from "../enums/difficulty";
import { GameMode } from "../enums/mode";
import { SoundMode } from "../enums/sound";

export function startGame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  gameMode: GameMode,
  chosenCharacter: Character,
  selectedMode: GameDifficulty,
  soundModeStatus: SoundMode
): void {
  // Clear any previous game state

  ctx.clearRect(
    0,
    0,
    CANVAS_DIMENSIONS.CANVAS_WIDTH,
    CANVAS_DIMENSIONS.CANVAS_HEIGHT
  );

  // Create a new game instance
  const game = new Game(
    canvas,
    ctx,
    gameMode,
    chosenCharacter,
    selectedMode,
    soundModeStatus
  );

  // Start the game
  game.start();
}
