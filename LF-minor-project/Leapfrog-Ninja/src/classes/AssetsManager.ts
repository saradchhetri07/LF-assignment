import { CANVAS_DIMENSIONS } from "../constants/constants";

import background from "../assets/sounds/backgroundMusic.ogg";
import swing from "../assets/sounds/swing.mp3";
import throWeapon from "../assets/sounds/throw.mp3";
import scrollGrab from "../assets/sounds/scrollGrab.mp3";
import potionGrab from "../assets/sounds/potionGrab.mp3";
import drinkPotion from "../assets/sounds/drinkPotion.mp3";
import groan from "../assets/sounds/groan.ogg";
import orkEvolve from "../assets/sounds/orkEvolve.wav";
import orkSound from "../assets/sounds/orkSound.wav";
import danger from "../assets/sounds/danger.ogg";
import earthCracking from "../assets/sounds/earthCracking.wav";
import disappear from "../assets/sounds/disappear.wav";
import reappear from "../assets/sounds/reappear.wav";
import pickupKunai from "../assets/sounds/pickupKunai.ogg";
import ninjaBoyDeath from "../assets/sounds/ninjaBoyDeath.wav";
import ninjaGirlSwinging from "../assets/sounds/ninjaGirlSwinging.mp3";

import startScreen from "../assets/Images/background/StartScreen.png";
import controlScreen from "../assets/Images/background/controlScreen.png";
import gameOverScreen from "../assets/Images/background/gameoverScreen.png";
import chooseCharacter from "../assets/Images/background/chooseCharacter.png";
import gameCompleted from "../assets/Images/background/gameCompleted.png";
import viewEnemies from "../assets/Images/background/enemyPower.png";
import levelCompleted from "../assets/Images/background/levelCompleted1.png";
import bossBackground from "../assets/Images/background/bossBackgrounds.png";
import healthPotion from "../assets/Images/gameplay/healthPotion.png";
import staminaPotion from "../assets/Images/gameplay/staminaPotion.png";
import maleCharacter from "../assets/Images/gameplay/maleCharacter.png";
import femaleCharacter from "../assets/Images/gameplay/femaleCharacter.png";
import difficultyScreen from "../assets/Images/background/difficultyScreen.jpeg";

import background1 from "../assets/Images/background/platBackground-CH1.png";
import background2 from "../assets/Images/background/background-CH2.png";
import background3 from "../assets/Images/background/platBackground-CH3.png";
import background4 from "../assets/Images/background/background-CH4.png";
import background5 from "../assets/Images/background/background-CH5.png";

import ninjaBoyIcon from "../assets/Images/player/ninjaBoyIcon.png";
import ninjaBoyRunning from "../assets/Images/player/ninjaBoyMove.png";
import ninjaBoyIdle from "../assets/Images/player/ninjaBoyIdle.png";
import ninjaBoyAttacking from "../assets/Images/player/ninjaBoyAttack.png";
import ninjaBoyDead from "../assets/Images/player/ninjaBoyDead.png";
import ninjaBoyJumping from "../assets/Images/player/ninjaBoyJumping.png";
import ninjaBoySliding from "../assets/Images/player/ninjaBoySliding.png";
import ninjaBoyThrowing from "../assets/Images/player/ninjaBoyThrowing.png";

import ninjaGirlIcon from "../assets/Images/player/ninjaGirlIcon.png";
import ninjaGirlRunning from "../assets/Images/player/ninjaGirlRunning.png";
import ninjaGirlIdle from "../assets/Images/player/ninjaGirlIdle.png";
import ninjaGirlAttacking from "../assets/Images/player/ninjaGirlAttacking.png";
import ninjaGirlJumping from "../assets/Images/player/ninjaGirlJumping.png";
import ninjaGirlDying from "../assets/Images/player/ninjaGirlDying.png";
import ninjaGirlSliding from "../assets/Images/player/ninjaGirlSliding.png";
import ninjaGirlThrowing from "../assets/Images/player/ninjaGirlThrowing.png";

import banditIcon from "../assets/Images/enemy/enemyIcon.png";
import banditIdle from "../assets/Images/enemy/enemyIdle.png";
import banditAttacking from "../assets/Images/enemy/enemyAttacking.png";
import banditRunning from "../assets/Images/enemy/enemyRunning.png";
import banditDying from "../assets/Images/enemy/enemyDead.png";

import orkIcon from "../assets/Images/enemy/orkIcon.png";
import orkIdle from "../assets/Images/enemy/orkIdle.png";
import orkAttacking from "../assets/Images/enemy/orkAttacking.png";
import orkRunning from "../assets/Images/enemy/orkRunning.png";
import orkDying from "../assets/Images/enemy/ork2Dying.png";

import ork2Icon from "../assets/Images/enemy/ork2Icon.png";
import ork2Idle from "../assets/Images/enemy/ork2Idle.png";
import ork2Attacking from "../assets/Images/enemy/ork2Attacking.png";
import ork2Running from "../assets/Images/enemy/ork2Running.png";
import ork2Dying from "../assets/Images/enemy/ork2Dying.png";

import samuraiIcon from "../assets/Images/enemy/samuraiIcon.png";
import samuraiIdle from "../assets/Images/enemy/samuraiIdle.png";
import samuraiAttacking from "../assets/Images/enemy/samuraiAttacking.png";
import samuraiRunning from "../assets/Images/enemy/samuraiRunning.png";
import samuraiDying from "../assets/Images/enemy/samuraiDying.png";

import samuraiHeavyIcon from "../assets/Images/enemy/samuraiHeavyIcon.png";
import samuraiHeavyIdle from "../assets/Images/enemy/samuraiHeavyIdle.png";
import samuraiHeavyAttacking from "../assets/Images/enemy/samuraiHeavyAttacking.png";
import samuraiHeavyRunning from "../assets/Images/enemy/samuraiHeavyRunning.png";
import samuraiHeavyDying from "../assets/Images/enemy/samuraiHeavyDying.png";

import bossIcon from "../assets/Images/enemy/bossIcon.png";
import bossIdle from "../assets/Images/enemy/bossRunning.png";
import bossAttacking from "../assets/Images/enemy/bossAttacking.png";
import bossRunning from "../assets/Images/enemy/bossRunning.png";
import bossDead from "../assets/Images/enemy/bossDying.png";

import aura from "../assets/Images/gameplay/auras.png";
import scroll from "../assets/Images/gameplay/scroll.png";
import sword from "../assets/Images/enemy/sword.png";
import kunaiImg from "../assets/Images/player/kunai.png";
import kunaiDown from "../assets/Images/player/kunaiDown.png";
import kunaiIcon from "../assets/Images/player/kunaiIcon.png";
import bossThrowable from "../assets/Images/enemy/bossThrowable.png";
import orkThrowable from "../assets/Images/enemy/orkThrowable.png";
import bombs from "../assets/Images/enemy/star.png";
import { SoundMode } from "../enums/sound";
import { Game } from "./game";

class AssetsManager {
  private static instance: AssetsManager;
  public audios: { [key: string]: HTMLAudioElement } = {};
  public sprites: { [key: string]: HTMLImageElement } = {};
  public isSoundOn: boolean = true;
  public initialGame?: Game;
  private assetsStillLoading: number = 0;
  private numAssets: number = 0;
  private loadedPercent: number = 0;

  private constructor() {}

  public static getInstance(): AssetsManager {
    if (!AssetsManager.instance) {
      AssetsManager.instance = new AssetsManager();
    }
    return AssetsManager.instance;
  }

  public setInitialGameInstance(initalGame: Game): void {
    this.initialGame = initalGame;
  }

  public getInitialGameInstance(): Game {
    return this.initialGame!;
  }

  public toggleSound(status: SoundMode) {
    if (status === SoundMode.ON) {
      this.isSoundOn = true;
    } else {
      this.isSoundOn = false;
    }
  }

  // Add this method to get the current sound status
  public getSoundStatus(): boolean {
    return this.isSoundOn;
  }

  public loadAssets(callback: () => void): void {
    const loadSprite = (fileName: string): HTMLImageElement => {
      this.assetsStillLoading++;
      const spriteImage = new Image();
      spriteImage.src = fileName;
      spriteImage.onload = () => {
        this.assetsStillLoading--;
      };
      spriteImage.onerror = (error) => {
        console.error(`Error loading sprite: ${fileName}`, error);
        this.assetsStillLoading--;
      };
      return spriteImage;
    };

    const loadAudio = (fileName: string): HTMLAudioElement => {
      this.assetsStillLoading++;
      const audio = new Audio(fileName);
      audio.oncanplaythrough = () => {
        this.assetsStillLoading--;
      };
      audio.onerror = (error) => {
        console.error(`Error loading audio: ${fileName}`, error);
        this.assetsStillLoading--;
      };
      return audio;
    };

    // Load the audios
    this.audios.BACKGROUND = loadAudio(background);
    this.audios.SWING = loadAudio(swing);
    this.audios.THROW = loadAudio(throWeapon);
    this.audios.SCROLLGRAB = loadAudio(scrollGrab);
    this.audios.POTIONGRAB = loadAudio(potionGrab);
    this.audios.DRINKPOTION = loadAudio(drinkPotion);
    this.audios.GROAN = loadAudio(groan);
    this.audios.ORKGROAN = loadAudio(orkEvolve);
    this.audios.ORKSOUND = loadAudio(orkSound);
    this.audios.DANGER = loadAudio(danger);
    this.audios.EARTHCRACKING = loadAudio(earthCracking);
    this.audios.BOSSDISSAPEAR = loadAudio(disappear);
    this.audios.BOSSREAPPEAR = loadAudio(reappear);
    this.audios.PICKUPKUNAI = loadAudio(pickupKunai);
    this.audios.NINJABOYDYING = loadAudio(ninjaBoyDeath);
    this.audios.NINJAGIRLSWINGING = loadAudio(ninjaGirlSwinging);

    // Load the sprite images
    this.sprites.MALECHARACTER = loadSprite(maleCharacter);
    this.sprites.FEMALECHARACTER = loadSprite(femaleCharacter);
    this.sprites.STARTSCREEN = loadSprite(startScreen);
    this.sprites.CONTROLSCREEN = loadSprite(controlScreen);
    this.sprites.GAMEOVERSCREEN = loadSprite(gameOverScreen);
    this.sprites.CHOOSECHARACTER = loadSprite(chooseCharacter);
    this.sprites.DIFFICULTYSCREEN = loadSprite(difficultyScreen);
    this.sprites.GAMECOMPLETED = loadSprite(gameCompleted);
    this.sprites.VIEWENEMIES = loadSprite(viewEnemies);
    this.sprites.LEVELCOMPLETED = loadSprite(levelCompleted);
    this.sprites.BOSS_BACKGROUND = loadSprite(bossBackground);
    this.sprites.HEALTH_POTION = loadSprite(healthPotion);
    this.sprites.STAMINA_POTION = loadSprite(staminaPotion);
    this.sprites.BACKGROUND_1 = loadSprite(background1);
    this.sprites.BACKGROUND_2 = loadSprite(background2);
    this.sprites.BACKGROUND_3 = loadSprite(background3);
    this.sprites.BACKGROUND_4 = loadSprite(background4);
    this.sprites.BACKGROUND_5 = loadSprite(background5);
    this.sprites.NINJABOYICON = loadSprite(ninjaBoyIcon);
    this.sprites.NINJABOYRUNNING = loadSprite(ninjaBoyRunning);
    this.sprites.NINJABOYIDLE = loadSprite(ninjaBoyIdle);
    this.sprites.NINJABOYATTACKING = loadSprite(ninjaBoyAttacking);
    this.sprites.NINJABOYDEAD = loadSprite(ninjaBoyDead);
    this.sprites.NINJABOYJUMPING = loadSprite(ninjaBoyJumping);
    this.sprites.NINJABOYSLIDING = loadSprite(ninjaBoySliding);
    this.sprites.NINJABOYTHROWING = loadSprite(ninjaBoyThrowing);
    this.sprites.NINJAGIRLICON = loadSprite(ninjaGirlIcon);
    this.sprites.NINJAGIRLRUNNING = loadSprite(ninjaGirlRunning);
    this.sprites.NINJAGIRLIDLE = loadSprite(ninjaGirlIdle);
    this.sprites.NINJAGIRLATTACKING = loadSprite(ninjaGirlAttacking);
    this.sprites.NINJAGIRLJUMPING = loadSprite(ninjaGirlJumping);
    this.sprites.NINJAGIRLDYING = loadSprite(ninjaGirlDying);
    this.sprites.NINJAGIRLSLIDING = loadSprite(ninjaGirlSliding);
    this.sprites.NINJAGIRLTHROWING = loadSprite(ninjaGirlThrowing);

    this.sprites.BANDITICON = loadSprite(banditIcon);
    this.sprites.BANDITIDLE = loadSprite(banditIdle);
    this.sprites.BANDITATTACKING = loadSprite(banditAttacking);
    this.sprites.BANDITRUNNING = loadSprite(banditRunning);
    this.sprites.BANDITDYING = loadSprite(banditDying);

    this.sprites.ORKICON = loadSprite(orkIcon);
    this.sprites.ORKIDLE = loadSprite(orkIdle);
    this.sprites.ORKATTACKING = loadSprite(orkAttacking);
    this.sprites.ORKRUNNING = loadSprite(orkRunning);
    this.sprites.ORKDYING = loadSprite(orkDying);

    this.sprites.ORK2ICON = loadSprite(ork2Icon);
    this.sprites.ORK2IDLE = loadSprite(ork2Idle);
    this.sprites.ORK2ATTACKING = loadSprite(ork2Attacking);
    this.sprites.ORK2RUNNING = loadSprite(ork2Running);
    this.sprites.ORK2DYING = loadSprite(ork2Dying);

    this.sprites.SAMURAIICON = loadSprite(samuraiIcon);
    this.sprites.SAMURAIDLE = loadSprite(samuraiIdle);
    this.sprites.SAMURAIATTACKING = loadSprite(samuraiAttacking);
    this.sprites.SAMURAIRUNNING = loadSprite(samuraiRunning);
    this.sprites.SAMURAIDYING = loadSprite(samuraiDying);

    this.sprites.SAMURAIHEAVYICON = loadSprite(samuraiHeavyIcon);
    this.sprites.SAMURAIHEAVYIDLE = loadSprite(samuraiHeavyIdle);
    this.sprites.SAMURAIHEAVYATTACKING = loadSprite(samuraiHeavyAttacking);
    this.sprites.SAMURAIHEAVYRUNNING = loadSprite(samuraiHeavyRunning);
    this.sprites.SAMURAIHEAVYDYING = loadSprite(samuraiHeavyDying);

    this.sprites.BOSSICON = loadSprite(bossIcon);
    this.sprites.BOSSIDLE = loadSprite(bossIdle);
    this.sprites.BOSSATTACKING = loadSprite(bossAttacking);
    this.sprites.BOSSRUNNING = loadSprite(bossRunning);
    this.sprites.BOSSDEAD = loadSprite(bossDead);

    this.sprites.AURA = loadSprite(aura);
    this.sprites.SCROLL = loadSprite(scroll);
    this.sprites.SWORD = loadSprite(sword);
    this.sprites.KUNAI_IMG = loadSprite(kunaiImg);
    this.sprites.KUNAI_DOWN = loadSprite(kunaiDown);
    this.sprites.KUNAI_ICON = loadSprite(kunaiIcon);
    this.sprites.BOSS_THROWABLE = loadSprite(bossThrowable);
    this.sprites.ORK_THROWABLE = loadSprite(orkThrowable);
    this.sprites.BOMBS = loadSprite(bombs);

    this.numAssets = this.assetsStillLoading;

    const assetsLoadingLoop = (callback: () => void): void => {
      this.loadedPercent =
        ((this.numAssets - this.assetsStillLoading) / this.numAssets) * 100;
      const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      // Clear the canvas
      ctx.clearRect(
        0,
        0,
        CANVAS_DIMENSIONS.CANVAS_WIDTH,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT
      );

      // Draw loading screen
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.fillRect(
        0,
        0,
        CANVAS_DIMENSIONS.CANVAS_WIDTH,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT
      );
      ctx.textAlign = "center";
      ctx.fillStyle = "#f6b602";
      ctx.font = "50px Jokerman";
      ctx.fillText(
        "Loading.....",
        CANVAS_DIMENSIONS.CANVAS_WIDTH / 2,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT / 2
      );
      ctx.fillText(
        `${parseInt(this.loadedPercent.toString())}%`,
        CANVAS_DIMENSIONS.CANVAS_WIDTH / 2,
        CANVAS_DIMENSIONS.CANVAS_HEIGHT / 2 + 80
      );
      ctx.closePath();

      if (this.assetsStillLoading === 0) {
        setTimeout(() => {
          callback();
        }, 2000);
        // Call the callback function once all assets are loaded
      } else {
        window.requestAnimationFrame(() => assetsLoadingLoop(callback)); // Continue the loop
      }
    };

    // Start the assets loading loop
    assetsLoadingLoop(callback);
  }
}

export const assetsManager = AssetsManager.getInstance();
