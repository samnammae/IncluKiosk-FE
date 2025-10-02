import { app, BrowserWindow, globalShortcut } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import isDev from "electron-is-dev";

// ES Module에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 1920,
    fullscreen: true, // 프로덕션에서만 전체화면
    kiosk: true, // 프로덕션에서만 키오스크 모드
    webPreferences: {
      nodeIntegration: false, // 보안: Renderer에서 Node.js 사용 금지
      contextIsolation: true, // 보안: Context 격리
      preload: path.join(__dirname, "preload.js"), // preload 스크립트 경로
    },
  });

  const url = isDev
    ? "http://localhost:5173"
    : `file://${path.join(__dirname, "../dist/index.html")}`;

  mainWindow.loadURL(url);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  //창 닫힘 이벤트
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  // Ctrl+Shift+Q로 종료 (관리자용)
  globalShortcut.register("CommandOrControl+Shift+Q", () => {
    app.quit();
  });
});

//모든 창 닫힘 처리
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
//macOS 활성화 처리
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

//단축키 해제
app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
