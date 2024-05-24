const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        click() {
          dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
              { name: '3D Models', extensions: ['obj', 'stl', 'fbx'] }
            ]
          }).then(result => {
            if (!result.canceled) {
              mainWindow.webContents.send('open-file', result.filePaths);
            }
          }).catch(err => {
            console.log(err);
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
        click() {  }
      }
    ]
  }
];

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});