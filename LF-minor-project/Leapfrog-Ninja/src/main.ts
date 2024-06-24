import { Sound } from "./interfaces/interface";
import { assetsManager } from "./classes/AssetsManager";
import "./style.css";
import { Game } from "./classes/game";
import { CANVAS_DIMENSIONS } from "./constants/constants";
import "./style.css";
import { drawStartScreen } from "./utils/startScreen";
import { Character } from "./enums/character";
import { GameDifficulty } from "./enums/difficulty";
import { GameMode } from "./enums/mode";
import { SoundMode } from "./enums/sound";

window.addEventListener("load", () => {
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

  canvas.width = CANVAS_DIMENSIONS.CANVAS_WIDTH;
  canvas.height = CANVAS_DIMENSIONS.CANVAS_HEIGHT;

  let chosenCharacter = Character.None;
  let selectedMode: GameDifficulty = GameDifficulty.Easy; // Default mode
  let gameMode: GameMode = GameMode.Multiplayer;
  let soundModeStatus: SoundMode = SoundMode.ON;

  if (!canvas) {
    console.log("No canvas found");
    return;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("No 2D context found!");
    return;
  }

  // Call loadAssets here
  assetsManager.loadAssets(() => {
    console.log("all assets are loaded");

    // Hide loading screen and show start screen
    drawStartScreen(ctx);

    // Get buttons
    const playGameButton = document.getElementById(
      "playGameID"
    ) as HTMLButtonElement;

    const chooseCharacterButton = document.getElementById(
      "chooseCharacterID"
    ) as HTMLButtonElement;

    const viewEnemiesButton = document.getElementById(
      "viewEnemiesID"
    ) as HTMLButtonElement;

    const difficultyButton = document.getElementById(
      "difficulty"
    ) as HTMLButtonElement;

    const modeButton = document.getElementById("playmode") as HTMLButtonElement;

    const okButton = document.getElementById("okID") as HTMLButtonElement;
    const soundButton = document.getElementById("soundId") as HTMLButtonElement;

    const ninjaBoyButton = document.getElementById(
      "ninjaBoy"
    ) as HTMLButtonElement;

    const ninjaGirlButton = document.getElementById(
      "ninjaGirl"
    ) as HTMLButtonElement;

    const modeSelector = document.getElementById(
      "modeSelector"
    ) as HTMLDivElement;

    const easyRadio = document.getElementById("easy") as HTMLInputElement;
    const mediumRadio = document.getElementById("medium") as HTMLInputElement;
    const difficultRadio = document.getElementById(
      "difficult"
    ) as HTMLInputElement;

    const soundMode = document.getElementById(
      "soundSelector"
    ) as HTMLDivElement;
    const onRadio = document.getElementById("onRadio") as HTMLInputElement;
    const offRadio = document.getElementById("onRadio") as HTMLInputElement;

    const gameModeSelector = document.getElementById(
      "gameModeSelector"
    ) as HTMLDivElement;
    const computerRadio = document.getElementById(
      "computer"
    ) as HTMLInputElement;

    const multiPlayerRadio = document.getElementById(
      "multiPlayer"
    ) as HTMLInputElement;

    playGameButton.style.display = "block";
    playGameButton.style.marginTop = "40px";
    playGameButton.style.marginLeft = "20px";

    viewEnemiesButton.style.display = "block";
    viewEnemiesButton.style.marginTop = "40px";
    viewEnemiesButton.style.marginLeft = "20px";

    chooseCharacterButton.style.display = "block";
    chooseCharacterButton.style.marginTop = "40px";
    chooseCharacterButton.style.marginLeft = "20px";

    difficultyButton.style.display = "block";
    difficultyButton.style.marginTop = "40px";
    difficultyButton.style.marginLeft = "20px";

    modeButton.style.display = "block";
    modeButton.style.marginTop = "40px";
    modeButton.style.marginLeft = "20px";

    soundButton.style.display = "block";
    soundButton.style.marginTop = "40px";
    soundButton.style.marginLeft = "20px";

    soundButton.addEventListener("click", () => {
      ctx.clearRect(
        0,
        0,
        CANVAS_DIMENSIONS.CANVAS_WIDTH,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT
      );
      clearStartButton();
      ctx.drawImage(
        assetsManager.sprites.DIFFICULTYSCREEN,
        0,
        0,
        CANVAS_DIMENSIONS.CANVAS_WIDTH,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT
      );
      soundMode.style.display = "block";
    });
    // // Add event listeners for buttons
    playGameButton.addEventListener("click", () => {
      ctx.clearRect(
        0,
        0,
        CANVAS_DIMENSIONS.CANVAS_WIDTH,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT
      );
      clearStartButton();
      okButton.style.display = "block";
      if (gameMode == GameMode.Computer) {
        ctx.drawImage(
          assetsManager.sprites.DIFFICULTYSCREEN,
          0,
          0,
          CANVAS_DIMENSIONS.CANVAS_WIDTH,
          CANVAS_DIMENSIONS.CANVAS_HEIGHT
        );
        // Draw text on canvas
        ctx.font = "20px Press Start 2P";
        ctx.textAlign = "center";
        ctx.fillText(
          "Get away from enemy",
          CANVAS_DIMENSIONS.CANVAS_WIDTH / 2 - 200,
          CANVAS_DIMENSIONS.CANVAS_HEIGHT / 2
        );
      } else {
        ctx.drawImage(
          assetsManager.sprites.CONTROLSCREEN,
          0,
          0,
          CANVAS_DIMENSIONS.CANVAS_WIDTH,
          CANVAS_DIMENSIONS.CANVAS_HEIGHT
        );
      }
      okButton.addEventListener("click", () => {
        okButton.style.display = "none";
        startGame();
      });
    });

    chooseCharacterButton.addEventListener("click", () => {
      // Logic for displaying choose character screen
      playGameButton.style.display = "none";
      viewEnemiesButton.style.display = "none";
      chooseCharacterButton.style.display = "none";
      difficultyButton.style.display = "none";
      modeButton.style.display = "none";

      ctx.clearRect(
        0,
        0,
        CANVAS_DIMENSIONS.CANVAS_WIDTH,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT
      );
      ctx.drawImage(
        assetsManager.sprites.CHOOSECHARACTER,
        0,
        0,
        CANVAS_DIMENSIONS.CANVAS_WIDTH,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT
      );

      ctx.drawImage(
        assetsManager.sprites.MALECHARACTER,
        150,
        60,
        CANVAS_DIMENSIONS.CANVAS_WIDTH / 3,
        500
      );
      ctx.drawImage(
        assetsManager.sprites.FEMALECHARACTER,
        400,
        60,
        CANVAS_DIMENSIONS.CANVAS_WIDTH / 3,
        500
      );
      clearStartButton();
      ninjaBoyButton.style.display = "block";
      ninjaGirlButton.style.display = "block";
    });

    viewEnemiesButton.addEventListener("click", () => {
      // Logic for displaying view enemies screen
      ctx.clearRect(
        0,
        0,
        CANVAS_DIMENSIONS.CANVAS_WIDTH,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT
      );

      clearStartButton();

      okButton.style.display = "block";
      okButton.style.marginTop = "40px";
      okButton.style.marginLeft = "20px";

      ctx.drawImage(
        assetsManager.sprites.VIEWENEMIES,
        0,
        0,
        CANVAS_DIMENSIONS.CANVAS_WIDTH,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT
      );
    });

    ninjaBoyButton.addEventListener("click", () => {
      chosenCharacter = Character.Male;
      ninjaBoyButton.style.display = "none";
      ninjaGirlButton.style.display = "none";
      playGameButton.style.display = "block";
      viewEnemiesButton.style.display = "block";
      chooseCharacterButton.style.display = "block";
      startGame();
    });

    ninjaGirlButton.addEventListener("click", () => {
      chosenCharacter = Character.Female;
      ninjaGirlButton.style.display = "none";
      ninjaBoyButton.style.display = "none";
      playGameButton.style.display = "block";
      viewEnemiesButton.style.display = "block";
      chooseCharacterButton.style.display = "block";
      startGame();
    });

    okButton.addEventListener("click", () => {
      okButton.style.display = "none";
      okButton.style.marginTop = "40px";
      modeSelector.style.display = "none";
      gameModeSelector.style.display = "none";
      initializeStartButton();
      drawStartScreen(ctx);
    });

    difficultyButton.addEventListener("click", () => {
      ctx.clearRect(
        0,
        0,
        CANVAS_DIMENSIONS.CANVAS_WIDTH,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT
      );
      clearStartButton();
      ctx.drawImage(
        assetsManager.sprites.DIFFICULTYSCREEN,
        0,
        0,
        CANVAS_DIMENSIONS.CANVAS_WIDTH,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT
      );

      modeSelector.style.display = "block";
      okButton.style.display = "block";
    });

    modeSelector.addEventListener("change", () => {
      if (easyRadio.checked) {
        selectedMode = GameDifficulty.Easy;
      } else if (mediumRadio.checked) {
        selectedMode = GameDifficulty.Medium;
      } else if (difficultRadio.checked) {
        selectedMode = GameDifficulty.Hard;
      }
    });

    gameModeSelector.addEventListener("change", () => {
      if (computerRadio.checked) {
        gameMode = GameMode.Computer;
      } else {
        gameMode = GameMode.Multiplayer;
      }
    });

    modeButton.addEventListener("click", () => {
      ctx.clearRect(
        0,
        0,
        CANVAS_DIMENSIONS.CANVAS_WIDTH,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT
      );
      clearStartButton();
      ctx.drawImage(
        assetsManager.sprites.DIFFICULTYSCREEN,
        0,
        0,
        CANVAS_DIMENSIONS.CANVAS_WIDTH,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT
      );

      gameModeSelector.style.display = "block";
      okButton.style.display = "block";
    });

    onRadio.addEventListener("click", () => {
      if (onRadio.checked) {
        soundModeStatus = SoundMode.ON;
      } else {
        soundModeStatus = SoundMode.OFF;
      }
    });

    function initializeStartButton(): void {
      playGameButton.style.display = "block";
      viewEnemiesButton.style.display = "block";
      chooseCharacterButton.style.display = "block";
      difficultyButton.style.display = "block";
      modeButton.style.display = "block";
    }

    function clearStartButton(): void {
      playGameButton.style.display = "none";
      viewEnemiesButton.style.display = "none";
      chooseCharacterButton.style.display = "none";
      difficultyButton.style.display = "none";
      modeButton.style.display = "none";
      soundButton.style.display = "none";
    }

    function startGame() {
      clearStartButton();
      const game = new Game(
        canvas,
        ctx!,
        //play with computer or multiplayer mode
        gameMode,
        chosenCharacter,
        //difficulty mode
        selectedMode,
        soundModeStatus
      );
      game.start();
    }
  });
});
