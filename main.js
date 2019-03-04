// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray, ipcMain } = require('electron');
const { startServer, restartServer } = require('./src/server');
const path = require('path');

const static = path.join(__dirname, 'static');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let detachedWindow;
let tray;

app.dock.hide();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createTray();
    createWindow();
    startServer({ mainWindow, detachedWindow });
});

app.on('window-all-closed', function() {
    app.quit();
});

function createTray() {
    tray = new Tray(path.join(static, 'tray-icon.png'));
    tray.on('right-click', toggleMainWindow);
    tray.on('double-click', toggleMainWindow);
    tray.on('click', function(event) {
        toggleMainWindow();
        if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
            window.openDevTools({ mode: 'detach' });
        }
    });
}

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 400,
        height: 450,
        show: false,
        frame: false,
        fullscreenable: false,
        resizable: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            backgroundThrottling: false,
        },
    });

    detachedWindow = new BrowserWindow({
        width: 400,
        height: 450,
        fullscreenable: false,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');
    detachedWindow.loadFile('index.html');
    detachedWindow.hide();

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    mainWindow.on('blur', function() {
        if (!mainWindow.webContents.isDevToolsOpened()) {
            mainWindow.hide();
        }
    });
}

function toggleMainWindow() {
    if (mainWindow.isVisible()) {
        mainWindow.hide();
    } else {
        showMainWindow();
    }
}

function showMainWindow() {
    const { x, y } = getWindowPosition();
    mainWindow.setPosition(x, y, false);
    mainWindow.show();
    mainWindow.focus();
}

function getWindowPosition() {
    const windowBounds = mainWindow.getBounds();
    const trayBounds = tray.getBounds();

    const x = Math.round(
        trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
    );
    const y = Math.round(trayBounds.y + trayBounds.height + 4);

    return { x, y };
}

ipcMain.on('show-window', function() {
    showMainWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
