const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let backendProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // ⚠️ Only for development
    }
  });

  // ✅ Load your built frontend
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  mainWindow.loadFile(indexPath);

  // ✅ Open DevTools automatically (helpful for debugging)
  mainWindow.webContents.openDevTools();

  // ✅ Show error if loading fails
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error(`❌ Failed to load: ${errorDescription} (Error code: ${errorCode})`);
  });

  // ✅ Show confirmation when content loads
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('✅ Page loaded successfully.');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  // ✅ Start the backend executable
  const backendPath = path.join(__dirname, 'backend', 'backend.exe');

  backendProcess = spawn(backendPath, [], {
    detached: true,
    stdio: 'ignore', // You can set to 'inherit' for debug
  });

  backendProcess.unref(); // So Electron can exit independently

  createWindow();
});

app.on('before-quit', () => {
  // ✅ Kill the backend process if needed (optional if detached)
  if (backendProcess && !backendProcess.killed) {
    try {
      backendProcess.kill();
      console.log('🛑 Backend process terminated.');
    } catch (err) {
      console.error('⚠️ Error killing backend process:', err);
    }
  }
});

app.on('window-all-closed', () => {
  // On macOS, apps stay active until user quits explicitly
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, re-create window when dock icon is clicked
  if (mainWindow === null) {
    createWindow();
  }
});
