export function getRandomInt(min: number, max: number) {
  return min + Math.floor((max - min + 1) * Math.random());
}
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
