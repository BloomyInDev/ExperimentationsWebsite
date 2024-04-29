import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    appType: "mpa",
    root: resolve(__dirname, "src"),
    publicDir: resolve(__dirname, "public"),
    build: {
        outDir: resolve(__dirname, "dist"),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                oc_latin_espagnol_game_menu: resolve(
                    __dirname,
                    "src/jeu-oc-latin-espagnol/index.html"
                ),
                oc_latin_espagnol_game: resolve(
                    __dirname,
                    "src/jeu-oc-latin-espagnol/game/index.html"
                ),
                viatge_oc: resolve(__dirname,"src/viatge-oc/index.html")
            },
        },
    },
    server: {
        port: 3333,
    },
});
