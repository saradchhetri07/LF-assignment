import Vector from "./vector.js";
import { getRandomColor, getRandomRadius } from "../utils.js";
export default class Circle {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = Vector.random(-2, 2, -2, 2);
    this.acc = new Vector(0, 0);
    this.radius = getRandomRadius(1, 5);
    this.color = getRandomColor();
  }

  update() {
    this.pos = Vector.add(this.pos, this.vel);
    this.vel = Vector.add(this.vel, this.acc);
    this.acc = Vector.multiply(this.acc, 0);
  }

  detectCollison(circle) {
    //v is the normal vector between two particles
    const v = Vector.subtract(this.pos, circle.pos);
    const distance = v.magnitute();
    if (distance <= this.radius + circle.radius) {
      //* swapping the color with each other
      // let colorTemp = this.color;
      // this.color = circle.color;
      // circle.color = colorTemp;

      const unitNormal = Vector.divide(v, v.magnitute());
      const unitTangent = unitNormal.getTangent();

      const overlapping = Vector.multiply(
        unitNormal,
        this.radius + circle.radius
      );

      const non_overlapping_vector = Vector.add(circle.pos, overlapping);
      this.pos = non_overlapping_vector;

      const a = this.vel;
      const b = circle.vel;

      const a_Normal = a.dotProduct(unitNormal);
      const b_Normal = b.dotProduct(unitNormal);

      const a_Tangent = a.dotProduct(unitTangent);
      const b_Tangent = b.dotProduct(unitTangent);

      const a_Normal_final =
        (a_Normal * (this.radius - circle.radius) +
          2 * circle.radius * b_Normal) /
        (this.radius + circle.radius);
      const b_Normal_final =
        (b_Normal * (circle.radius - this.radius) +
          2 * this.radius * a_Normal) /
        (this.radius + circle.radius);

      //component after the collision
      const a_Normal_after = Vector.multiply(unitNormal, a_Normal_final);
      const b_Normal_after = Vector.multiply(unitNormal, b_Normal_final);

      const a_Tangent_after = Vector.multiply(unitTangent, a_Tangent);
      const b_Tangent_after = Vector.multiply(unitTangent, b_Tangent);

      //final velocity
      const a_after = Vector.add(a_Normal_after, a_Tangent_after);
      const b_after = Vector.add(b_Normal_after, b_Tangent_after);

      this.vel = a_after;
      circle.vel = b_after;
    }
  }
  collisionEdge(width, height) {
    //*wall collision detection for upper and lower edge of wall
    if (this.pos.x - this.radius <= 0 || this.pos.x + this.radius >= width) {
      if (this.pos.x - this.radius <= 0) {
        this.pos.x = this.radius;
      } else if (this.pos.x + this.radius >= width) {
        this.pos.x = width - this.radius;
      }
      this.vel.x = -this.vel.x;
    }
    if (this.pos.y - this.radius <= 0 || this.pos.y + this.radius >= height) {
      this.vel.y = -this.vel.y;
      if (this.pos.y - this.radius <= 0) {
        this.pos.y = this.radius;
      } else if (this.pos.y + this.radius > height) {
        this.pos.y = height - this.radius;
      }
    }
  }

  mouseMovement(mousePos) {
    console.log(mousePos);

    const dx = this.pos.x - mousePos.x;
    const dy = this.pos.y - mousePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const SAFE_DISTANCE = 200;
    console.log(distance);
    if (distance < SAFE_DISTANCE) {
      //   console.log("inside mouseMovement");
      //   const angle = Math.atan2(dy, dx);
      //   const force = (SAFE_DISTANCE - distance) / SAFE_DISTANCE;

      //   this.vel.x += Math.cos(angle) * force;
      //   this.vel.y += Math.sin(angle) * force;

      this.pos.x = -this.pos.x;
      this.pos.y = -this.pos.y;
    }
  }
}
