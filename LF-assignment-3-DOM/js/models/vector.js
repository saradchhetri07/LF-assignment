import { getRandomInt } from "../utils.js";
export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // Adds two vectors and returns a new vector
  static addVectors(vector1, vector2) {
    return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
  }

  // Multiplies a vector by a scalar and returns a new vector
  static scaleVector(vector, scalar) {
    return new Vector(vector.x * scalar, vector.y * scalar);
  }

  // Divides a vector by a scalar and returns a new vector
  static divideVector(vector, scalar) {
    return new Vector(vector.x / scalar, vector.y / scalar);
  }

  // Subtracts the second vector fromthefirst and returns a new vector
  static subtractVector(vector1, vector2) {
    return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
  }
  // Returns a new vector that is tangent to this vector
  getTangentVector() {
    return new Vector(-this.y, this.x);
  }
  // Computes the dot product of this vector and another vector
  computeDotProduct(vector) {
    return this.x * vector.x + this.y * vector.y;
  }
  // Returns the magnitude (length) of this vector
  computeMagnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  // Generates a random vector within the specified range
  static randomVector(minX, maxX, minY, maxY) {
    return new Vector(getRandomInt(minX, maxX), getRandomInt(minY, maxY));
  }
}
