import "./style.css";
import { Game } from "./classes/game";
import { CANVAS_DIMENSIONS } from "./constants/constants";

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

  const game = new Game(canvas, ctx);
  game.start();
});
