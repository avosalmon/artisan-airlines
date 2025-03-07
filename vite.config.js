import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.tsx"],
      ssr: "resources/js/ssr.jsx",
      refresh: true,
    }),
    react(),
    tsconfigPaths(), // Resolve path aliases in tsconfig.json.
  ],
  esbuild: {
    jsx: "automatic",
  },
});
