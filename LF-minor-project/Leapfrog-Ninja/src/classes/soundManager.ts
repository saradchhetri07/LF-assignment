import { Sound } from "../interfaces/interface";

/**
 * Class representing the sound manager.
 */
export class SoundManager {
  private sounds: { [key: string]: Sound };

  /**
   * Create a new sound manager.
   */
  constructor() {
    this.sounds = {};
  }

  /**
   * Load a sound file.
   * @param {string} key - The key to reference this sound.
   * @param {string} src - The source file for the sound.
   * @param {boolean} loop - Whether the sound should loop.
   */
  loadSound(key: string, src: string, loop: boolean = false): void {
    const audio = new Audio(src);
    audio.loop = loop;
    this.sounds[key] = { audio, loop };
  }

  /**
   * Play a sound.
   * @param {string} key - The key of the sound to play.
   */
  playSound(key: string): void {
    if (this.sounds[key]) {
      this.sounds[key].audio.currentTime = 0;
      this.sounds[key].audio.play();
    }
  }

  /**
   * Stop a sound.
   * @param {string} key - The key of the sound to stop.
   */
  stopSound(key: string): void {
    if (this.sounds[key]) {
      this.sounds[key].audio.pause();
      this.sounds[key].audio.currentTime = 0;
    }
  }

  /**
   * Pause a sound.
   * @param {string} key - The key of the sound to pause.
   */
  pauseSound(key: string): void {
    if (this.sounds[key]) {
      this.sounds[key].audio.pause();
    }
  }

  /**
   * Resume a sound.
   * @param {string} key - The key of the sound to resume.
   */
  resumeSound(key: string): void {
    if (this.sounds[key]) {
      this.sounds[key].audio.play();
    }
  }

  /**
   * Set the volume for a sound.
   * @param {string} key - The key of the sound.
   * @param {number} volume - The volume level (between 0 and 1).
   */
  setVolume(key: string, volume: number): void {
    if (this.sounds[key]) {
      this.sounds[key].audio.volume = volume;
    }
  }

  /**
   * Mute a sound.
   * @param {string} key - The key of the sound to mute.
   */
  muteSound(key: string): void {
    if (this.sounds[key]) {
      this.sounds[key].audio.muted = true;
    }
  }

  /**
   * Unmute a sound.
   * @param {string} key - The key of the sound to unmute.
   */
  unmuteSound(key: string): void {
    if (this.sounds[key]) {
      this.sounds[key].audio.muted = false;
    }
  }

  /**
   * Check if a sound is playing.
   * @param {string} key - The key of the sound.
   * @returns {boolean} - True if the sound is playing, false otherwise.
   */
  isSoundPlaying(key: string): boolean {
    if (this.sounds[key]) {
      return !this.sounds[key].audio.paused;
    }
    return false;
  }
}
