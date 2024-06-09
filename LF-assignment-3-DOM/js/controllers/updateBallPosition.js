// import { playAudio } from "../utils.js";
import { detectBallCollision, handleBallCollision } from "./detectCollision.js";
//load the pop sound

const updateBallPosition = (ballArray, box) => {
  try {
    // Get the box dimensions
    const boxWidth = box.element.offsetWidth - 20;
    const boxHeight = box.element.offsetHeight - 40;

    // Handle wall collision
    for (let ball of ballArray) {
      try {
        ball.updatePosition();
        if (ball.x < 0 || ball.x + ball.w > boxWidth) {
          ball.dx = -ball.dx; // Reverse direction in x-axis
          if (ball.x < 0) {
            ball.x = 0;
          }
          if (ball.x + ball.w > boxWidth) {
            ball.x = boxWidth - ball.w;
          }
        }
        if (ball.y < 0 || ball.y + ball.h > boxHeight) {
          ball.dy = -ball.dy; // Reverse direction in y-axis
          if (ball.y < 0) {
            ball.y = 0; // Correct the position to prevent sticking
          }
          if (ball.y + ball.h > boxHeight) {
            ball.y = boxHeight - ball.h;
          }
        }
      } catch (ballError) {
        console.error(
          `Error updating position for ball at index ${ballArray.indexOf(
            ball
          )}:`,
          ballError
        );
      }
    }

    // Check for collisions between balls
    for (let i = 0; i < ballArray.length; i++) {
      for (let j = i + 1; j < ballArray.length; j++) {
        try {
          if (detectBallCollision(ballArray[i], ballArray[j])) {
            handleBallCollision(ballArray[i], ballArray[j]);
          }
        } catch (collisionError) {
          console.error(
            `Error detecting/handling collision between ball ${i} and ball ${j}:`,
            collisionError
          );
        }
      }
    }

    requestAnimationFrame(() => updateBallPosition(ballArray, box));
  } catch (error) {
    console.error("Error in updateBallPosition function:", error);
  }
};

export { updateBallPosition };
