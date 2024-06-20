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

  context.fillStyle = "#fff";
  context.font = "48px Sans-serif";
  context.textAlign = "center";
  context.fillText("LEVEL COMPLETED", canvas.width / 2, 100);

  context.font = "24px Arial";
  context.fillText(`NINJA HEALTH: ${health}`, canvas.width / 2, 200);
  context.fillText(`KUNAIS LEFT: ${kunaiCount}`, canvas.width / 2, 250);
  context.fillText("SCROLLS REMAINING:", canvas.width / 2, 300);

  const ninjaImage = new Image();
  ninjaImage.src = "../assets/ninja.png"; // Update the path if necessary
  ninjaImage.onload = () => {
    context.drawImage(ninjaImage, canvas.width / 2 - 50, 350, 100, 100);
  };

  const resumeButton = document.getElementById(
    "resumeButton"
  ) as HTMLButtonElement;
  if (resumeButton) {
    resumeButton.style.display = "block";
  }

  context.restore();
}
