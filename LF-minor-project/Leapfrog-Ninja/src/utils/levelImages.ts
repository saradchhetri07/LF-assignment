import level1background1 from "../assets/Images/background/platBackground-CH1.png";

import level1background2 from "../assets/Images/background/platBackground-CH1.png";

export const makeLevelImages = () => {
  const levelImages: { [key: string]: HTMLImageElement[] } = {
    level1: [],
    level2: [],
    level3: [],
    level4: [],
  };

  const backgrounds: { [key: string]: string[] } = {
    level1: [level1background1, level1background2],
    level2: [level1background1, level1background1],
    level3: [level1background1, level1background1],
    level4: [level1background1, level1background1],
  };

  for (let level = 1; level <= 4; level++) {
    const levelKey = `level${level}`;
    for (let i = 0; i < 5; i++) {
      const image = new Image();
      image.src = backgrounds[levelKey][i];
      levelImages[levelKey].push(image);
    }
  }

  return levelImages;
};
