//* imports
import Box from "./models/box.js"; // Importing the Box class
import Ball from "./models/ball.js"; // Importing the Box class
import { getRandomInt, getRandomRadius } from "./utils.js"; // Importing utility functions
import { updateBallPosition } from "./controllers/updateBallPosition.js"; // Importing the updateBallPosition function

//* box  instantiation
const box = new Box("box"); // Creating a new instance of the Box class
const { width: boxWidth, height: boxHeight } = box.getDimensions(); // Getting the dimensions of the box

// * adjusting the boundaries along x-axis based on the box dimensions
const BOUNDARY_X_MIN = 0; // Minimum x boundary
const BOUNDARY_X_MAX = boxWidth - 30; // Maximum x boundary adjusted to keep ball inside the box

// * adjusting the boundaries along x-axis based on the box dimensions
const BOUNDARY_Y_MIN = 0; // Minimum y boundary
const BOUNDARY_Y_MAX = boxHeight - 30; // Maximum y boundary adjusted to keep ball inside the box

const BALL_COUNT = 800; // Number of balls to be created
const ballArray = []; // Array to store the ball objects

for (let i = 0; i < BALL_COUNT; i++) {
  var randomRadius = getRandomInt(10, 20); // Generate a random radius for the ball
  const ball = new Ball(
    box.element, // The box element where the ball will be added
    getRandomInt(BOUNDARY_X_MIN, BOUNDARY_X_MAX), // Random x position within boundaries
    getRandomInt(BOUNDARY_Y_MIN, BOUNDARY_Y_MAX), // Random y position within boundaries
    randomRadius, // Set the width of the ball
    randomRadius // Set the height of the ball
  );

  ballArray.push(ball); // Add the ball to the array
}
updateBallPosition(ballArray, box); // Function to update the positions of the balls within the box
