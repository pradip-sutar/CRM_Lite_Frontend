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
  // Use __dirname to point to build.exe in your project root directory
  const exePath = path.join(__dirname, "build.exe");

  console.log(`Starting backend: ${exePath}`);

  backendProcess = spawn(exePath, [], {
    detached: true,
    stdio: "ignore",
  });

  backendProcess.unref();

  backendProcess.on("error", (err) => {
    console.error("Failed to start backend process:", err);
  });

  console.log("Backend process started...");
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
