import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import electron from "electron";

const { app, BrowserWindow, globalShortcut, screen } = electron;

// Fix __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let backendProcess;

function startBackend() {
  // Detect packaging vs. dev:
  // `app.isPackaged` is `false` in `electron .` and true when built.
  const exeName = 'CRM_Lite_backend.exe';

  const exePath = app.isPackaged
    // In production, extraResources go into process.resourcesPath
    ? path.join(process.resourcesPath, exeName)
    // In dev, __dirname is the folder where main.js lives
    : path.join(__dirname, exeName);

  console.log(`[startBackend] launching: ${exePath}`);

  backendProcess = spawn(exePath, [], {
    detached: true,
    stdio: 'ignore',
  });

  backendProcess.unref();

  backendProcess.on('error', (err) => {
    console.error('[startBackend] failed to start:', err);
  });

  console.log('[startBackend] backend started, pid=' + backendProcess.pid);
}


function stopBackend() {
  if (backendProcess) {
    backendProcess.kill();
    console.log("Backend process stopped.");
  }
}

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
    icon: path.join(__dirname, "public", "icon.ico"),
  });

  if (process.env.NODE_ENV === "development") {
    const loadURLWithRetry = (retries = 5) => {
      win
        .loadURL("http://localhost:3006")
        .then(() => console.log("✅ Vite dev server loaded successfully"))
        .catch((err) => {
          if (retries > 0) {
            console.warn(
              `⚠️ Retry loading Vite server... attempts left: ${retries}`
            );
            setTimeout(() => loadURLWithRetry(retries - 1), 2000);
          } else {
            console.error("❌ Could not connect to Vite dev server:", err);
          }
        });
    };

    loadURLWithRetry();
    win.webContents.openDevTools();
  } else {
    const indexPath = path.join(__dirname, "dist", "index.html");
    const fileUrl = `file://${indexPath.replace(/\\/g, "/")}`; // For Windows compatibility

    console.log("📦 Loading production file:", fileUrl);
    win.loadURL(fileUrl);
  }
}

app.whenReady().then(() => {
  console.log("App is ready...");
  startBackend();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    stopBackend();
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
