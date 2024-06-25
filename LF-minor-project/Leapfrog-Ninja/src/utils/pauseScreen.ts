/**
 * Draw the pause screen.
 * @param {CanvasRenderingContext2D} context - The drawing context.
 * @param {HTMLCanvasElement} canvas - The canvas element.
 * @param {number} health - The player's health.
 * @param {number} kunaiCount - The number of kunais left.
 */
export function drawPauseScreen(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  health: number,
  kunaiCount: number
): void {
  context.save();
  context.fillStyle = "rgba(0, 0, 0, 0.5)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Set the font to "Press Start 2P"
  context.font = '20px "Press Start 2P"';
  context.fillStyle = "white"; // Set text color
  context.textAlign = "center"; // Center align the text
  context.textBaseline = "middle"; // Middle align the text

  context.fillText("Paused", canvas.width / 2, 100);
  context.fillText(`NINJA HEALTH: ${health}`, canvas.width / 2, 200);
  context.fillText(`KUNAIS LEFT: ${kunaiCount}`, canvas.width / 2, 250);
  context.fillText(`SCROLLS REMAINING:${3}`, canvas.width / 2, 300);
  context.fillText("Press P to resume:", canvas.width / 2, 350);

  const ninjaImage = new Image();
  ninjaImage.src = "../assets/ninja.png"; // Update the path if necessary
  ninjaImage.onload = () => {
    context.drawImage(ninjaImage, canvas.width / 2 - 50, 350, 100, 100);
  };

  context.restore();
}
