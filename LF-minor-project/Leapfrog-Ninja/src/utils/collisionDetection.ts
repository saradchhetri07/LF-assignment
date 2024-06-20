export const checkCollisions = (a: any, b: any): boolean => {
  // Implement collision detection and handling logic
  if (
    a.position.x < b.position.x + b.size.width &&
    a.position.x + a.size.width > b.position.x &&
    a.position.y < b.position.y + b.size.height &&
    a.position.y + a.size.height > b.position.y
  ) {
    // Collision detected!
    return true;
  }
  return false;
};
