import { DIMENSIONS, PLATFORM, PLAYER } from "./constant";
import { Platform, IPlatform } from "./components/Platform";
import platformImage from "./assets/platform.png";
import badPlatform from "./assets/bad-platform.png";
import jetpack from "./assets/jetpack.png";
import { getRandomInt } from "./utils/common";
import { player } from "./playerManager";
import { score, updateScore } from "./scoreManager";
import { jumpSound } from "./sound";

export const platforms: IPlatform[] = [];
const MAX_VERTICAL_GAP = 90; // Maximum vertical gap that the player can jump
const MAX_HORIZONTAL_GAP = 150; // Maximum horizontal gap that the player can jump

/**
 * Initialize platforms for the game.
 */
export function initializePlatforms() {
  createInitialPlatforms();
}

/**
 * Create initial platforms.
 */
export function createInitialPlatforms() {
  const initialY = DIMENSIONS.CANVAS_HEIGHT - PLAYER.HEIGHT;
  const initialX = DIMENSIONS.CANVAS_WIDTH / 2 - PLAYER.WIDTH / 2;

  let platform = new Platform(
    initialX,
    initialY,
    platformImage,
    false,
    true,
    jetpack
  );
  platforms.push(platform);

  for (let i = 1; i < 10; i++) {
    let randomX =
      initialX + getRandomInt(-MAX_HORIZONTAL_GAP, MAX_HORIZONTAL_GAP);
    randomX = Math.max(
      0,
      Math.min(randomX, DIMENSIONS.CANVAS_WIDTH - PLATFORM.WIDTH)
    );
    let platform = new Platform(
      randomX,
      initialY - (PLATFORM.HEIGHT + PLATFORM.MIN_DISTANCE) * i,
      platformImage,
      false,
      true,
      jetpack
    );
    platforms.push(platform);
  }
}

/**
 * Create a new platform and add it to the platforms array.
 */
export function newPlatform() {
  const lastPlatformY = platforms[platforms.length - 1].y;
  let randomX =
    platforms[platforms.length - 1].x +
    getRandomInt(-MAX_HORIZONTAL_GAP, MAX_HORIZONTAL_GAP);
  randomX = Math.max(
    0,
    Math.min(randomX, DIMENSIONS.CANVAS_WIDTH - PLATFORM.WIDTH)
  );

  const hasJetPack = Math.random() < 0.2;
  const isBadPlatform = Math.random() < 0.3;
  let platform = new Platform(
    randomX,
    lastPlatformY -
      PLATFORM.HEIGHT -
      PLATFORM.MIN_DISTANCE -
      getRandomInt(50, MAX_VERTICAL_GAP),
    isBadPlatform ? badPlatform : platformImage,
    hasJetPack,
    isBadPlatform,
    jetpack
  );
  platforms.push(platform);
}

/**
 * Draw all platforms on the canvas.
 * @param ctx The rendering context of the canvas.
 */
export function drawPlatforms(ctx: CanvasRenderingContext2D) {
  platforms.forEach((platform) => {
    platform.draw(ctx, score);
    if (player.velocityY < 0 && player.y < (DIMENSIONS.CANVAS_HEIGHT * 3) / 4) {
      platform.y -= player.velocityY * 3; // Sliding the platform down
    }
  });
}

/**
 * Update platforms based on the player's position.
 */
export function updatePlatforms() {
  while (platforms.length > 0 && platforms[0].y >= DIMENSIONS.CANVAS_HEIGHT) {
    updateScore();
    platforms.shift();
    for (let i = 0; i < 20; i++) {
      newPlatform();
    }
  }
}

/**
 * Check collision between the player and platforms.
 */
export function checkCollisions() {
  platforms.forEach((platform) => {
    if (
      player.y + player.height > platform.y &&
      player.y + player.height < platform.y + platform.height &&
      player.x + player.width > platform.x &&
      player.x < platform.x + platform.width &&
      player.velocityY > 0
    ) {
      //   if (!platform.isgoodPlatform) {
      //     score -= 300;
      //   }
      // Check if jetpack is present
      if (platform.hasJetPack) {
        player.velocityY = player.bounceStrength * 1.2;
        platform.hasJetPack = false;
        platform.y -= player.velocityY;
      } else {
        player.velocityY = player.bounceStrength;
      }
      player.isJumping = false;
      jumpSound.play();
    }
  });

  // If the player exceeds vertically, redirect to the first platform
  if (player.y < 0) {
    player.y = platforms[1].y - player.height;
  }
}
