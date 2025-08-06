import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    base: "/kiosk/",
    //빌드 관련 설정
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    server: {
      // 프록시 설정
      proxy: {
        "/api": {
          target: env.VITE_SERVER_ADDRESS,
          changeOrigin: true,
        },
      },
    },
  };
});
