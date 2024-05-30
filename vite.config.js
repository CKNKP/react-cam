import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/react-cam/", // Replace with your repository name
  build: {
    outDir: "dist",
  },
  preview: {
    port: 3080,
    host: true,
  },
  server: {
    host: "0.0.0.0",
    port: 3080,
  },
});
