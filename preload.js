const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
    toggleAlwaysOnTop: () => ipcRenderer.invoke('toggle-always-on-top'),
    minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
    closeWindow: () => ipcRenderer.invoke('close-window'),
    restoreWindow: () => ipcRenderer.invoke('restore-window'),
    getAlwaysOnTopStatus: () => ipcRenderer.invoke('get-always-on-top-status'),
    startWithChannels: (channels) => ipcRenderer.invoke('start-with-channels', channels),
    getChannels: () => ipcRenderer.invoke('get-channels')
});
