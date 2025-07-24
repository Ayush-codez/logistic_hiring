import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxying requests starting with /api to your backend server
      "/api": {
        target: "http://localhost:5000", // Your backend server address
        changeOrigin: true, // Recommended for virtual hosted sites
        secure: false, // Optional: set to false if your backend is not using HTTPS
      },
    },
  },
});
