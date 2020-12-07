// public/electron.ts
import './instagram-ipc';

import { app, BrowserWindow } from 'electron';
import { ipcMain } from 'electron-better-ipc';
import * as isDev from 'electron-is-dev';
import * as path from 'path';

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 320,
    height: 568,
    center: true,
    resizable: false,
    title: 'Instagram.exe',
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, './preload.js'),
    },
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

ipcMain.answerRenderer('minimize-app', () => {
  mainWindow.minimize();
});

ipcMain.answerRenderer('close-app', () => {
  app.quit();
});
