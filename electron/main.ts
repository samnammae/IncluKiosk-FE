import { app, BrowserWindow, globalShortcut } from "electron";
import { autoUpdater } from "electron-updater";
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
    fullscreen: !isDev, // 프로덕션에서만 전체화면
    kiosk: !isDev, // 프로덕션에서만 키오스크 모드
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

// 자동 업데이트 설정
function setupAutoUpdater(): void {
  // 개발 모드에서는 업데이트 체크 안함
  if (isDev) {
    console.log("개발 모드: 자동 업데이트 비활성화");
    return;
  }

  // 업데이트 체크 (앱 시작 후 즉시)
  autoUpdater.checkForUpdatesAndNotify();

  // 업데이트 이벤트 로깅
  autoUpdater.on("checking-for-update", () => {
    console.log("업데이트 확인 중...");
  });

  autoUpdater.on("update-available", (info) => {
    console.log("업데이트 발견:", info.version);
  });

  autoUpdater.on("update-not-available", (info) => {
    console.log("최신 버전입니다:", info.version);
  });

  autoUpdater.on("error", (err) => {
    console.error("업데이트 에러:", err);
  });

  autoUpdater.on("download-progress", (progressObj) => {
    console.log(`다운로드 진행: ${Math.round(progressObj.percent)}%`);
  });

  autoUpdater.on("update-downloaded", (info) => {
    console.log("업데이트 다운로드 완료:", info.version);
    console.log("앱을 재시작하여 업데이트를 적용합니다...");

    // 5초 후 자동으로 재시작하여 업데이트 적용
    setTimeout(() => {
      autoUpdater.quitAndInstall();
    }, 5000);
  });
}

app.whenReady().then(() => {
  createWindow();
  setupAutoUpdater();

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
