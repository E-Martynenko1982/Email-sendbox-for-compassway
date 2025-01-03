import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
	loadEnv(mode, process.cwd(), "VITE_");

	return {
		plugins: [react()],
		define: {
			global: {},
		},
		server: {
			proxy:
				mode === "development"
					? {
							"/api": {
								target: "http://68.183.74.14:4005",
								changeOrigin: true,
								rewrite: (path) => path.replace(/^\/api/, "/api"),
							},
					  }
					: undefined,
		},
	};
});
