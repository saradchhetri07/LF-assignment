import { DIMENSIONS } from "./constant";

export const canvas = document.querySelector<HTMLCanvasElement>("#board")!;
export const ctx = canvas.getContext("2d")!;

/**
 * Initialize the canvas with specified dimensions.
 */
export function initializeCanvas() {
  canvas.width = DIMENSIONS.CANVAS_WIDTH;
  canvas.height = DIMENSIONS.CANVAS_HEIGHT;
  return canvas;
}
