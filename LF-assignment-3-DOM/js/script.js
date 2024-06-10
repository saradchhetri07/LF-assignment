//* Imports
import Box from "./models/box.js"; // Box class
import Ball from "./models/ball.js"; // Ball class
import { getRandomInt, initSlider } from "./utils.js"; // Utility functions
import { updateBallPosition } from "./controllers/updateBallPosition.js"; // Update ball position function

//* Box instantiation
const box = new Box("box");
const { width: boxWidth, height: boxHeight } = box.getDimensions();

//* Boundaries based on the box dimensions
const BOUNDARY_X_MIN = 0;
const BOUNDARY_X_MAX = boxWidth - 30;
const BOUNDARY_Y_MIN = 0;
const BOUNDARY_Y_MAX = boxHeight - 30;

//* Slider initialization
const { slider, valueDisplay, getSlider } = initSlider();

const ballArray = []; // Array to store the ball objects

// Function to create balls and add them to the box
function createBalls(BALL_COUNT, balls, box) {
  balls.forEach((ball) => {
    box.element.removeChild(ball.element);
  });
  balls.length = 0;

  // Create new balls
  for (let i = 0; i < BALL_COUNT; i++) {
    const randomRadius = getRandomInt(10, 20); // Random radius for the ball
    const ball = new Ball(
      box.element,
      getRandomInt(BOUNDARY_X_MIN, BOUNDARY_X_MAX),
      getRandomInt(BOUNDARY_Y_MIN, BOUNDARY_Y_MAX),
      randomRadius,
      randomRadius
    );
    balls.push(ball);
  }
}

//* Event listener to update ball count when slider value changes
slider.addEventListener("input", (event) => {
  const newCount = getSlider();
  valueDisplay.innerText = newCount;
  createBalls(newCount, ballArray, box);
});

//* Update ball positions within the box
updateBallPosition(ballArray, box);
