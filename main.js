const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 700,
    frame: false,  
    transparent: false,  
    resizable: true,
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        enableRemoteModule: false,
        nodeIntegration: false
    }

  });
  win.loadFile('index.html');
}

const { ipcMain } = require('electron');

ipcMain.handle('minimize', () => {
  win.minimize();
});

ipcMain.handle('maximize', () => {
  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
});

ipcMain.handle('close', () => {
  win.close();
});

ipcMain.on('start-resize', (event, edge) => {
  const validEdges = ['bottom', 'top', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];
  if (validEdges.includes(edge)) {
    win.setResizable(true);
  }
});


app.whenReady().then(createWindow);