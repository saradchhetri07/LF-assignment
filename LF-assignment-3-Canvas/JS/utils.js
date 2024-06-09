const getRandomInt = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);

  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};
const getRandomColor = () => {
  // Generate random values for R, G, and B
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  // Construct CSS color string
  return `rgb(${r}, ${g}, ${b})`;
};

const getRandomRadius = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + 10;
};

export { getRandomInt, getRandomColor, getRandomRadius };
