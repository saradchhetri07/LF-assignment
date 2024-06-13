import { PLATFORM } from "../constant";
import { IPlatform } from "../components/Platform";

export function getSuitableY(
  existingPlatforms: IPlatform[],
  canvasHeight: number
): number {
  let y: number;
  let overlapping: boolean;

  do {
    overlapping = false;
    y = Math.random() * (canvasHeight - PLATFORM.HEIGHT);

    for (let platform of existingPlatforms) {
      const distanceY = Math.abs(y - platform.y);
      if (distanceY < PLATFORM.HEIGHT + PLATFORM.MIN_DISTANCE) {
        overlapping = true;
        break;
      }
    }
  } while (overlapping);

  return y;
}
