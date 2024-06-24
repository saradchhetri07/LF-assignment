/**
 * Generate a random value between the given min and max values.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} - A random value between min and max.
 */
export function getRandomValue(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}
