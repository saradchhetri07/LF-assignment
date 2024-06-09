import { getRandomInt } from "../utils.js";
export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static add(vector1, vector2) {
    return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
  }

  static multiply(vector, scalar) {
    return new Vector(vector.x * scalar, vector.y * scalar);
  }
  static divide(vector, scalar) {
    return new Vector(vector.x / scalar, vector.y / scalar);
  }

  static subtract(vector1, vector2) {
    return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
  }
  getTangent() {
    return new Vector(-this.y, this.x);
  }

  dotProduct(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  magnitute() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  static random(minX, maxX, minY, maxY) {
    return new Vector(getRandomInt(minX, maxX), getRandomInt(minY, maxY));
  }
}
