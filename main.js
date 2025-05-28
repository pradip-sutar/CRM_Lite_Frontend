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
    win.loadURL("http://localhost:3006");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "dist", "index.html"));
  }

  globalShortcut.register("Alt+Left", () => {
    if (win.webContents.canGoBack()) {
      win.webContents.goBack();
    }
  });

  win.webContents.on("did-fail-load", () => {
    console.log("No previous page to go back to.");
  });
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
