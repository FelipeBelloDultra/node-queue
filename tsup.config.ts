import { defineConfig } from "tsup";

export default defineConfig({
  tsconfig: "./tsconfig.json",
  clean: true,
  minify: true,
});
