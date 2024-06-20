import "./style.css";
import { Game } from "./classes/game";
import { CANVAS_DIMENSIONS } from "./constants/constants";
import { loadAssets } from "./utils/audioLoad";

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
  // Load assets before starting the game
  loadAssets()
    .then((assets) => {
      const game = new Game(canvas, ctx, assets);
      game.start();
      // Add event listener for space bar to pause/resume the game
    })
    .catch((error) => {
      console.error("Error loading assets:", error);
    });
});
