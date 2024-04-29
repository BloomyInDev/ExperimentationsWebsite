import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    appType: "mpa",
    root: resolve(__dirname, "src"),
    publicDir: resolve(__dirname, "public"),
    build: {
        outDir: resolve(__dirname, "dist"),
        emptyOutDir: true,
    },
    server:{
        port:3333
    }
});
