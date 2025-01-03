import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		global: {},
	},
	server: {
		proxy: {
			"/api": {
				target: process.env.VITE_API_URL || "http://localhost:4005",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, "/api"),
			},
		},
	},
});
