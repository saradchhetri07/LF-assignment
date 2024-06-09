import Vector from "../models/vector.js";

const detectBallCollision = (ball1, ball2) => {
  try {
    const dx = ball1.x + ball2.w / 2 - (ball2.x + ball1.w / 2);
    const dy = ball1.y + ball2.h / 2 - (ball2.y + ball1.h / 2);

    const distance = Math.sqrt(dx * dx + dy * dy);
    const totalRadii = ball1.h / 2 + ball2.h / 2;

    if (distance == 0) {
      // If balls are at the exact same position
      ball1.dx = 0;
      ball2.dx = 0;
      ball1.updatePosition();
      ball2.updatePosition();
    }

    return distance < totalRadii;
  } catch (error) {
    console.error("Error in detectBallCollision function:", error);
    return false; // Return false in case of error
  }
};

const handleBallCollision = (ball1, ball2) => {
  try {
    // Radius of ball 1
    const r1 = ball1.w / 2;
    // Radius of ball 2
    const r2 = ball2.w / 2;
    // Vector for ball1
    const vector1 = new Vector(ball1.x + r1, ball1.y + r1);
    // Vector for ball2
    const vector2 = new Vector(ball2.x + r2, ball2.y + r2);
    const v = Vector.subtractVector(vector1, vector2);
    const distance = v.computeMagnitude();
    if (distance <= r1 + r2) {
      // Calculate unit normal
      const unitNormal = Vector.divideVector(v, distance);
      const unitTangent = unitNormal.getTangentVector();

      const a = new Vector(ball1.dx, ball1.dy);
      const b = new Vector(ball2.dx, ball2.dy);

      const a_Normal = a.computeDotProduct(unitNormal);
      const b_Normal = b.computeDotProduct(unitNormal);

      const a_Tangent = a.computeDotProduct(unitTangent);
      const b_Tangent = b.computeDotProduct(unitTangent);

      const a_Normal_final =
        (a_Normal * (r1 - r2) + 2 * r2 * b_Normal) / (r1 + r2);
      const b_Normal_final =
        (b_Normal * (r2 - r1) + 2 * r1 * a_Normal) / (r1 + r2);

      // Component after the collision
      const a_Normal_after = Vector.scaleVector(unitNormal, a_Normal_final);
      const b_Normal_after = Vector.scaleVector(unitNormal, b_Normal_final);

      const a_Tangent_after = Vector.scaleVector(unitTangent, a_Tangent);
      const b_Tangent_after = Vector.scaleVector(unitTangent, b_Tangent);

      // Final velocity
      const a_after = Vector.addVectors(a_Normal_after, a_Tangent_after);
      const b_after = Vector.addVectors(b_Normal_after, b_Tangent_after);

      ball1.dx = a_after.x;
      ball1.dy = a_after.y;

      ball2.dx = b_after.x;
      ball2.dy = b_after.y;

      // Prevent balls from sticking together by correcting their positions
      const overlap = r1 + r2 - distance;
      const correction = Vector.scaleVector(unitNormal, overlap / 2);
      ball1.x += correction.x;
      ball1.y += correction.y;
      ball2.x -= correction.x;
      ball2.y -= correction.y;
    }
  } catch (error) {
    console.error("Error in handleBallCollision function:", error);
  }
};

export { detectBallCollision, handleBallCollision };
