import jumpSoundUrl from "./assets/jump.mp3";
import fallSoundUrl from "./assets/fall.mp3";

export const jumpSound = new Audio(jumpSoundUrl);
export const fallSound = new Audio(fallSoundUrl);

/**
 * Initialize the sound effects.
 */
export function initializeSounds() {
  jumpSound.load();
  fallSound.load();
}
