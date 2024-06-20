import backgroundSound from "../assets/sounds/backgroundMusic.mp3";

export type Assets = {
  [key: string]: HTMLImageElement | HTMLAudioElement;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

function loadAudio(src: string): Promise<HTMLAudioElement> {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.onloadeddata = () => resolve(audio);
    audio.onerror = () => reject(new Error(`Failed to load audio: ${src}`));
    audio.src = src;
  });
}

export async function loadAssets(): Promise<Assets> {
  const assets: {
    [key: string]: Promise<HTMLImageElement | HTMLAudioElement>;
  } = {
    // image1: loadImage("../assets/images/somename.png"),
    backgroundSound: loadAudio(backgroundSound),
  };

  const loadedAssets = await Promise.all(Object.values(assets));
  return Object.keys(assets).reduce((acc, key_1, index) => {
    acc[key_1] = loadedAssets[index];
    return acc;
  }, {} as Assets);
}
