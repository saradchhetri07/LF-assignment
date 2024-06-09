import { getRandomInt, getRandomColor } from "../utils.js";
import Vector from "./vector.js";
import Circle from "./circle.js";

export default class Canvas {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);

    this.canvas.width = 500;
    this.canvas.height = 500;

    this.canvas.style.backgroundColor = "white";
    this.canvas.style.height = "80vh";
    this.canvas.style.width = "70vw";
    this.canvas.style.margin = "10%";

    this.mousePos = new Vector(0, 0);

    //* tracking mouse movement
    this.canvas.addEventListener("mousemove", (event) =>
      this.mouseTrack(event)
    );

    this.setUp();
    requestAnimationFrame(() => this.update());
  }

  mouseTrack(event) {
    // const rect = this.canvas.getBoundingClientRect();
    // this.mousePos.x = event.clientX - rect.left;
    // this.mousePos.y = event.clientY - rect.top;
    // console.log(`${this.mousePos.x} and ${this.mousePos.y}`);
  }

  setUp() {
    const NUMBER_OF_CIRCLES = 500;
    this.circlesArray = [];
    for (let i = 0; i < NUMBER_OF_CIRCLES; i++) {
      let circle = new Circle(
        getRandomInt(0, this.canvas.width),
        getRandomInt(0, this.canvas.height)
      );
      //check if circle has been made at the edge
      this.circlesArray.push(circle);
    }
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.circlesArray.length; i++) {
      for (let j = i + 1; j < this.circlesArray.length; j++) {
        this.circlesArray[i].detectCollison(this.circlesArray[j]);
      }
    }

    for (let circle of this.circlesArray) {
      circle.update();
      circle.collisionEdge(this.canvas.width, this.canvas.height);
      //   circle.mouseMovement(this.mousePos);
      this.ctx.fillStyle = circle.color;
      this.ctx.beginPath();
      this.ctx.arc(circle.pos.x, circle.pos.y, circle.radius, 0, 2 * Math.PI);
      this.ctx.fill();
    }

    requestAnimationFrame(() => this.update());
  }
}
