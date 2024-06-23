import { assetsManager } from "./classes/AssetsManager";
import "./style.css";
import { Game } from "./classes/game";
import { CANVAS_DIMENSIONS } from "./constants/constants";
import { Mode } from "./enums/mode";
import "./style.css";
import { drawStartScreen } from "./utils/startScreen";

window.addEventListener("load", () => {
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
  canvas.width = CANVAS_DIMENSIONS.CANVAS_WIDTH;
  canvas.height = CANVAS_DIMENSIONS.CANVAS_HEIGHT;

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

    const okButton = document.getElementById("okID") as HTMLButtonElement;

    playGameButton.style.display = "block";
    playGameButton.style.marginTop = "40px";
    playGameButton.style.marginLeft = "20px";

    viewEnemiesButton.style.display = "block";
    viewEnemiesButton.style.marginTop = "40px";
    viewEnemiesButton.style.marginLeft = "20px";

    chooseCharacterButton.style.display = "block";
    chooseCharacterButton.style.marginTop = "40px";
    chooseCharacterButton.style.marginLeft = "20px";

    // // Add event listeners for buttons
    playGameButton.addEventListener("click", () => {
      ctx.clearRect(
        0,
        0,
        CANVAS_DIMENSIONS.CANVAS_WIDTH,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT
      );
      // ctx.drawImage(assetsManager.sprites.)
      // const game = new Game(canvas, ctx, Mode.Multiplayer);
      // game.start();
    });

    chooseCharacterButton.addEventListener("click", () => {
      // Logic for displaying choose character screen
      playGameButton.style.display = "none";
      viewEnemiesButton.style.display = "none";
      chooseCharacterButton.style.display = "none";
      ctx.clearRect(
        0,
        0,
        CANVAS_DIMENSIONS.CANVAS_WIDTH,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT
      );
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.fillRect(
        0,
        0,
        CANVAS_DIMENSIONS.CANVAS_WIDTH,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT
      );
      ctx.drawImage(
        assetsManager.sprites.MALECHARACTER,
        150,
        100,
        CANVAS_DIMENSIONS.CANVAS_WIDTH / 3,
        500
      );
      ctx.drawImage(
        assetsManager.sprites.FEMALECHARACTER,
        400,
        100,
        CANVAS_DIMENSIONS.CANVAS_WIDTH / 3,
        500
      );
    });

    viewEnemiesButton.addEventListener("click", () => {
      // Logic for displaying view enemies screen
      ctx.clearRect(
        0,
        0,
        CANVAS_DIMENSIONS.CANVAS_WIDTH,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT
      );

      playGameButton.style.display = "none";
      viewEnemiesButton.style.display = "none";
      chooseCharacterButton.style.display = "none";

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

    okButton.addEventListener("click", () => {
      okButton.style.display = "none";
      okButton.style.marginTop = "40px";
      playGameButton.style.display = "block";
      viewEnemiesButton.style.display = "block";
      chooseCharacterButton.style.display = "block";
      drawStartScreen(ctx);
    });
  });
});
