const popSound = new Audio("pop.mp3");

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

const detectCollision = (ball1, ball2) => {
  //distance between two balls along x asix
  const dx = ball1.x - ball2.x;
  //distance between two balls along y axis
  const dy = ball1.y - ball2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < (ball1.w + ball2.w) / 2;
};

const getRandomRadius = () => {
  return Math.floor(Math.random() * 150);
};

export { getRandomInt, getRandomColor, detectCollision, getRandomRadius };
