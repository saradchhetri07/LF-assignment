const carousel = document.querySelector(".carousel");
const carouselItems = document.querySelectorAll(".carousel-item");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const interval = document.getElementById("intervalTime");
const indicators = document.querySelectorAll(".indicator");

const intervalInput = document.getElementById("interval") as HTMLInputElement;

const intervalSpan = document.getElementById("intervalValue");

const holdTimeCheckBox = document.getElementById(
  "holdTime"
) as HTMLInputElement;

let intervalTime: number = 2000;
let isOnHold: boolean = false;

//event listener for handling interval
intervalInput?.addEventListener("input", () => {
  intervalSpan!.textContent = intervalInput.value;
  intervalTime = parseInt(intervalInput.value);
  stopAutoSlide();
  nextSlide();
  initAutoSlide();
});

holdTimeCheckBox?.addEventListener("change", () => {
  if (holdTimeCheckBox!.checked) {
    stopAutoSlide();
    isOnHold = true;
  } else {
    isOnHold = false;
    initAutoSlide();
  }
});

let currentItemIndex = 0;

// Time interval in milliseconds (3 seconds)
let autoSlideInterval: number;

// Initialize the carousel
function initialize() {
  slideShow(currentItemIndex);
  initAutoSlide();
}

function slideShow(index: number) {
  if (!isOnHold) {
    carouselItems.forEach((item, i) => {
      (item as HTMLElement).style.position = "relative";
      (item as HTMLElement).style.left = `${-index * 100}%`;
      indicators[i].classList.toggle("active", i === index);
    });
  }
}

// Function to go to the next slide
function nextSlide() {
  currentItemIndex = (currentItemIndex + 1) % carouselItems.length;
  slideShow(currentItemIndex);
}

// Function to go to the previous slide
function prevSlide() {
  if (currentItemIndex > 0) {
    currentItemIndex--;
  } else {
    currentItemIndex = carouselItems.length - 1;
  }
  slideShow(currentItemIndex);
}

// Function to start the automatic sliding
function initAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, intervalTime);
}

// Function to stop the automatic sliding
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Event listeners for previous and next buttons
prevBtn!.addEventListener("click", () => {
  stopAutoSlide();
  prevSlide();
  initAutoSlide();
});

nextBtn!.addEventListener("click", () => {
  stopAutoSlide();
  nextSlide();
  initAutoSlide();
});

// Event listeners for indicators
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    stopAutoSlide();
    currentItemIndex = index;
    slideShow(currentItemIndex);
    initAutoSlide();
  });
});

// Initialize the carousel
initialize();
