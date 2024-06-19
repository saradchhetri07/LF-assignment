import level1background1 from "../assets/Images/background/level1background1.jpeg";

export const makeLevelImages = () => {
  const levelImages: { [key: string]: HTMLImageElement[] } = {
    level1: [],
    level2: [],
    level3: [],
    level4: [],
  };

  const backgrounds: { [key: string]: string[] } = {
    level1: [
      level1background1,
      level1background1,
      level1background1,
      level1background1,
      level1background1,
    ],
    level2: [
      level1background1,
      level1background1,
      level1background1,
      level1background1,
      level1background1,
    ],
    level3: [
      level1background1,
      level1background1,
      level1background1,
      level1background1,
      level1background1,
    ],
    level4: [
      level1background1,
      level1background1,
      level1background1,
      level1background1,
      level1background1,
    ],
    // level2: [level2background1, level2background2, level2background3, level2background4, level2background5],
    // level3: [level3background1, level3background2, level3background3, level3background4, level3background5],
    // level4: [level4background1, level4background2, level4background3, level4background4, level4background5]
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
