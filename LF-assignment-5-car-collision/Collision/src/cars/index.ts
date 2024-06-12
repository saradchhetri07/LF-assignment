import { DIMENSIONS } from "../constants";
import playerCar from "../assets/player-car.png";
import enemyCar from "../assets/enemy-car.png";
import { CarImage } from "../models/CarImage";
import { getRandomInt } from "../utils/common";

export const lanes = [
  DIMENSIONS.CANVAS_WIDTH / 2 -
    DIMENSIONS.CAR_WIDTH / 2 -
    DIMENSIONS.CANVAS_WIDTH / 3,

  DIMENSIONS.CANVAS_WIDTH / 2 - DIMENSIONS.CAR_WIDTH / 2,

  DIMENSIONS.CANVAS_WIDTH / 2 -
    DIMENSIONS.CAR_WIDTH / 2 +
    DIMENSIONS.CANVAS_WIDTH / 3,
];

export const mainCar = new CarImage(
  lanes[1],
  DIMENSIONS.CANVAS_HEIGHT - 100,
  DIMENSIONS.CAR_WIDTH,
  DIMENSIONS.CAR_HEIGHT,
  playerCar
);

export const cars = [
  new CarImage(
    lanes[1],
    getRandomInt(0, 100),
    DIMENSIONS.CAR_WIDTH,
    DIMENSIONS.CAR_HEIGHT,
    enemyCar
  ),
  new CarImage(
    lanes[0],
    getRandomInt(100, 200),
    DIMENSIONS.CAR_WIDTH,
    DIMENSIONS.CAR_HEIGHT,
    enemyCar
  ),
  new CarImage(
    lanes[2],
    getRandomInt(300, 400),
    DIMENSIONS.CAR_WIDTH,
    DIMENSIONS.CAR_HEIGHT,
    enemyCar
  ),
];
