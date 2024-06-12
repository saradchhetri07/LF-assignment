import { defineConfig } from "vite";
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        game: "game.html",
        gameover: "gameover.html",
      },
    },
  },
});
