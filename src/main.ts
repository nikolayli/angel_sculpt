import { app, BrowserWindow, Menu, dialog, MenuItemConstructorOptions } from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: BrowserWindow | null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../public/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

const mainMenuTemplate: (MenuItemConstructorOptions | Electron.MenuItem)[] = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        click(): void {
          dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
              { name: '3D Models', extensions: ['obj', 'stl', 'fbx'] }
            ]
          }).then(result => {
            if (!result.canceled && mainWindow) {
              mainWindow.webContents.send('open-file', result.filePaths);
            }
          }).catch(err => {
            console.error(err);
          });
        }
      }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Options',
        click(): void { /* Your code here */ }
      }
    ]
  }
];

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