// public/electron.ts
import { app, BrowserWindow } from 'electron';
import * as isDev from 'electron-is-dev';
import * as path from 'path';

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    center: true,
    kiosk: !isDev,
    resizable: true,
    title: 'Instagram.exe',
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined!;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
