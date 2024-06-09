// import Circle from "../models/circle.js";
// import { getRandomInt } from "../utils.js";

// export function setUp(canvasInstance) {
//   const { canvas } = canvasInstance;
//   let circlesArray = [];
//   const NUMBER_OF_CIRCLES = 100;
//   for (let i = 0; i < NUMBER_OF_CIRCLES; i++) {
//     let circle = new Circle(
//       getRandomInt(0, canvas.width),
//       getRandomInt(0, canvas.height)
//     );
//     circlesArray.push(circle);
//   }
// }

// export function update(canvasInstance) {
//   const { ctx, canvas, circlesArray } = canvasInstance;

//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   for (let i = 0; i < circlesArray.length; i++) {
//     for (let j = i + 1; j < circlesArray.length; j++) {
//       circlesArray[i].detectCollison(circlesArray[j]);
//     }
//   }

//   for (let circle of circlesArray) {
//     circle.update();
//     circle.collisionEdge(canvas.width, canvas.height);
//     ctx.fillStyle = circle.color;
//     ctx.beginPath();
//     ctx.arc(circle.pos.x, circle.pos.y, circle.radius, 0, 2 * Math.PI);
//     ctx.fill();
//   }

//   requestAnimationFrame(() => update(canvasInstance));
// }
