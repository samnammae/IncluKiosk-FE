import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Electron 빌드 여부 확인
  const isElectron = process.env.ELECTRON === "true";

  return {
    plugins: [react()],
    base: isElectron ? "./" : "/kiosk/", // Electron은 상대경로, 웹은 /kiosk/

    //빌드 설정
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
