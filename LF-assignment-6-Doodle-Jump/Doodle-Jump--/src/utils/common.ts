export function getRandomInt(min: number, max: number) {
  //min and max both will be inclusive
  return min + Math.floor((max - min + 1) * Math.random());
}
