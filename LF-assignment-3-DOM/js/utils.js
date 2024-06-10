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

const initSlider = () => {
  // Create a slider element container
  const sliderContainer = document.createElement("div");
  sliderContainer.style.marginTop = "20px";
  sliderContainer.style.display = "flex";
  sliderContainer.style.alignItems = "center";

  const label = document.createElement("label");
  label.htmlFor = "ballCount";
  label.innerText = "Ball Count: ";
  sliderContainer.appendChild(label);

  // Create the slider element
  const slider = document.createElement("input");
  slider.type = "range";
  slider.id = "ballCount";
  slider.min = "10";
  slider.max = "1200";
  slider.value = "40";
  sliderContainer.appendChild(slider);

  // Create the value display element
  const valueDisplay = document.createElement("span");
  valueDisplay.id = "sliderValue";
  valueDisplay.innerText = slider.value;
  valueDisplay.style.marginLeft = "10px"; // Add some space between the slider and the value
  sliderContainer.appendChild(valueDisplay);

  // Append the slider container to the document body
  document.body.appendChild(sliderContainer);

  // Function to get the current slider value
  function getSlider() {
    return parseInt(slider.value, 10);
  }

  return { slider, valueDisplay, getSlider };
};

export {
  getRandomInt,
  getRandomColor,
  detectCollision,
  getRandomRadius,
  initSlider,
};
