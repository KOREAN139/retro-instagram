export {}
declare global {
  interface Window {
    ipcRenderer: RendererProcessIpc
  }
}
