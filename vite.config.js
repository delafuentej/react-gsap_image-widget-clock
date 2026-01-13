import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  chunkSizeWarningLimit: 2000,
  rollupOptions: {
    output: {
      manualChunks(id) {
        if (id.includes("node_modules/react")) return "react";
      },
    },
  },
  plugins: [visualizer({ open: true }), react()],
});
