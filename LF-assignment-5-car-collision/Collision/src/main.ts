import "./style.css";
import { DIMENSIONS, SPEED } from "./constants";
import { mainCar, cars, lanes } from "./cars/index";
import { tiles } from "./tile/index";
import { getRandomInt, clamp } from "./utils/common";
import { CarImage } from "./models/CarImage";
import { Fire } from "./models/Fire";
import { Blast } from "./models/Blast";
import fireImageSource from "./assets/weapon.png";
import blastImageSource from "./assets/blast.png";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

const scoreCanvas = document.getElementById("scoreCanvas") as HTMLCanvasElement;
const scoreCtx = scoreCanvas.getContext("2d")!;

const fires: Fire[] = [];
const blasts: Blast[] = []; // Array to store blast objects

let score = 0;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

let currentLaneIndex = 1;
let targetLaneIndex = currentLaneIndex;

let highestScore = parseInt(localStorage.getItem("highestScore") || "0");
let SPEED_DETECTOR = 0;

let maxAmmo = 0;

function draw() {
  //clearing previously built canvas
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  // Adjust speed based on score using clamp
  let speed = clamp(Math.floor(score / 10), 2, 10); // Speed increases with score, clamped between 2 and 10

  // Change background color based on speed
  if (score < 10) {
    maxAmmo = 5;
    ctx.fillStyle = "lightblue"; // Background color for speed <= 4
  } else if (score >= 20) {
    maxAmmo = 10;
    ctx.fillStyle = "red"; // Background color for speed <= 6
  } else if (score < 0) {
    maxAmmo = 15;
    ctx.fillStyle = "lightgreen"; // Background color for speed > 6
  } else {
    ctx.fillStyle = "indigo";
  }

  cars.forEach((car, carIndex) => {
    ctx.drawImage(car.image, car.x, car.y, car.width, car.height);

    SPEED_DETECTOR = SPEED * speed;
    car.y += SPEED_DETECTOR;

    if (car.y > DIMENSIONS.CANVAS_HEIGHT) {
      car.y = getRandomInt(-100, 0);

      let randomLane;
      do {
        randomLane = getRandomInt(0, lanes.length - 1);
        car.x = lanes[randomLane];
      } while (
        checkOverlap(
          car,
          cars.filter((otherCar) => otherCar !== car)
        )
      );

      score++;
      //if localscore exceeded update the highest score
      if (score > highestScore) {
        highestScore = score;
        localStorage.setItem("highestScore", highestScore.toString());
      }
    }

    if (checkCollision(mainCar, car)) {
      //if collided reset the game
      const blast = new Blast(
        mainCar.x, // Adjust the fire position to come from the center of the car
        mainCar.y,
        80,
        80,
        blastImageSource
      );
      blasts.push(blast);
      resetGame();
    }

    //check collision between fire and car
    fires.forEach((fire, fireIndex) => {
      ctx.beginPath();
      ctx.drawImage(fire.image, fire.x, fire.y, fire.width, fire.height);
      fire.y -= SPEED_DETECTOR;

      if (checkCollision(fire, car)) {
        cars[carIndex].y = getRandomInt(-100, 0);
        fires.splice(fireIndex, 1); // Remove fire
      }
    });
  });

  tiles.forEach((tile) => {
    ctx.drawImage(tile.image, tile.x, tile.y, tile.width, tile.height);
    tile.y += SPEED * (speed / 2);

    if (tile.y >= DIMENSIONS.CANVAS_HEIGHT) {
      tile.y = -tile.height + 80;
    }
  });

  // Smoothly transition the main car's position
  if (mainCar.x !== lanes[targetLaneIndex]) {
    mainCar.x += (lanes[targetLaneIndex] - mainCar.x) * 0.2;
  }

  ctx.drawImage(
    mainCar.image,
    mainCar.x,
    mainCar.y,
    mainCar.width,
    mainCar.height
  );

  // Draw blast images last to ensure they appear on top
  blasts.forEach((blast) => {
    ctx.drawImage(blast.image, blast.x, blast.y, blast.width, blast.height);
  });

  scoreCtx.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
  scoreCtx.fillStyle = "white";
  scoreCtx.font = "30px 'Press Start 2P', cursive";
  scoreCtx.fillText(`Score: ${score}`, 20, 30);
  scoreCtx.fillText(`Highest Score: ${highestScore}`, 20, 60);
  scoreCtx.fillText(`Ammo number: ${maxAmmo}`, 20, 90);
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

//check if two enemy cars overlap with one another
function checkOverlap(car: CarImage, otherCars: CarImage[]) {
  return otherCars.some((otherCar) => {
    return (
      car.x < otherCar.x + otherCar.width &&
      car.x + car.width > otherCar.x &&
      car.y < otherCar.y + otherCar.height &&
      car.y + car.height > otherCar.y
    );
  });
}

//resetting the default values and transiting to gameover file
function resetGame() {
  localStorage.setItem("localScore", score.toString());
  window.location.href = "gameover.html";
}

function checkCollision(car1: CarImage, car2: CarImage): boolean {
  const rect1 = {
    x: car1.x,
    y: car1.y,
    w: car1.width,
    h: car1.height,
  };

  const rect2 = {
    x: car2.x,
    y: car2.y,
    w: car2.width,
    h: car2.height,
  };

  if (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  ) {
    return true;
  } else {
    return false;
  }
}

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "a":
      if (currentLaneIndex > 0) {
        targetLaneIndex = currentLaneIndex - 1;
      }
      break;
    case "b":
      if (currentLaneIndex < lanes.length - 1) {
        targetLaneIndex = currentLaneIndex + 1;
      }
      break;
    case " ": // Spacebar to emit fire
      if (score >= 0 && score < 10 && maxAmmo > 0) {
        const fire = new Fire(
          mainCar.x + mainCar.width / 2 - 5, // Adjust the fire position to come from the center of the car
          mainCar.y,
          10,
          20,
          fireImageSource
        );
        score++;
        --maxAmmo;
        fires.push(fire);
      }
      break;
  }
  currentLaneIndex = targetLaneIndex;
});
