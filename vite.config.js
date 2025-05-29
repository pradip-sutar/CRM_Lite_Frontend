import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isDev = process.env.NODE_ENV !== "production";

export default defineConfig({
  plugins: [react()],
  base: isDev ? "/" : "./", // Use './' for Electron production build

  build: {
    outDir: "dist",
    emptyOutDir: true,
  },

  server: {
    host: "0.0.0.0",
    port: 3006,
  },

  preview: {
    host: "0.0.0.0",
    port: 3006,
    allowedHosts: ["*"],
  },
});
