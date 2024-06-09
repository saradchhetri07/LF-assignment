import { getRandomColor } from "../utils.js";

export default class Ball {
  // * constructor for ball
  constructor(parent, x = 0, y = 0, w = 150, h = 150, color) {
    this.x = x; // Initial x position of the ball
    this.y = y; // Initial y position of the ball
    this.w = w; // Width of the ball
    this.h = h; // Height of the ball

    this.color = color || getRandomColor(); // Use the provided color or a random color if not provided

    this.dx = 8; // Velocity along the x-axis
    this.dy = 8; // Velocity along the y-axis

    this.element = document.createElement("div"); // Create a new div element for the ball

    this.element.style.display = "flex"; // Set display style to flex
    this.element.style.width = `${this.w}px`; // Set the width of the ball element
    this.element.style.height = `${this.h}px`; // Set the height of the ball element
    this.element.style.top = `${this.y}px`; // Set the initial top position of the ball element
    this.element.style.left = `${this.x}px`; // Set the initial left position of the ball element
    this.element.style.borderRadius = "50%"; // Make the ball element round
    this.element.style.position = "absolute"; // Set the position to absolute
    this.element.style.background = `${this.color}`; // Set the background color of the ball element
    this.element.addEventListener("click", () => {}); // Add a click event listener (empty function)

    parent.appendChild(this.element); // Append the ball element to the parent element
  }

  // Method to update the position of the ball
  updatePosition() {
    this.x += this.dx; // Update the x position based on velocity
    this.y += this.dy; // Update the y position based on velocity
    this.element.style.left = `${this.x}px`; // Update the left position of the ball element
    this.element.style.top = `${this.y}px`; // Update the top position of the ball element
    this.element.style.background = this.element.style.background; // (Redundant) Set the background color again
  }
}
