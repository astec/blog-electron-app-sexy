// Modules to control application life and create native browser window
const {app, ipcMain, Menu, shell, BrowserWindow} = require('electron')
const path = require('path');
const updater = require("../modules/updater.module");
const tray = require("../modules/tray.module");
const appMenu = require("../modules/app.menu.module");
const globalShortcuts = require("../modules/global.shortcuts.module");
const dragAndDrop = require("../modules/drag.and.drop.module");
const crashReporter = require("../modules/crash.reporter.module");
import { format as formatUrl } from 'url'

require('update-electron-app')()
/**
 Dock and tray integration
 Notifications
 Menus
 Shortcuts
 Drag and drop
 Crash reporting
 Signed installers for all three platforms
 Automatic updaters for Mac and Windows
 Fast startup
 One-step build
 */


function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // Crash reporter init and start
    // crashReporter.init();
    // crashReporter.start();

    // and load the index.html of the app.
    mainWindow.loadURL(formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
      }))

    // create channel
    createChannel();

    // build app menu
    appMenu.create(mainWindow);

    // create tray
    tray.setTray();

    // register global shortcuts
    globalShortcuts.registerShortcuts();

    // updater.init();

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}

function createChannel() {
    ipcMain.on('asynchronous-message', (event, arg) => {
        console.log(arg); // prints "ping"
        event.reply('asynchronous-reply', 'pong');
    });

    ipcMain.on('synchronous-message', (event, arg) => {
        console.log(arg); // prints "ping"
        event.returnValue = 'pong';
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    createWindow();
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();

    // unregister shortcuts
    globalShortcuts.unregisterShortcuts();

    // destroy tray
    tray.destroy();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
