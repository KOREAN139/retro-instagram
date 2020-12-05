/* eslint-disable */
import { ipcRenderer, RendererProcessIpc } from 'electron-better-ipc';

declare global {
  interface Window {
    ipcRenderer: RendererProcessIpc;
  }
}

window.ipcRenderer = ipcRenderer;
