const {notify} = require("./notify.module");
const {ipcRenderer, webContents} = require('electron');

module.exports = {
    sendMessage: (message) => {
        let notifyUserChannelName = 'notify-user';
        const focusedWebContents = webContents.getFocusedWebContents();
        if (focusedWebContents) {
            focusedWebContents.send(notifyUserChannelName, message);
        }
    },
    listenToWindowNotification: () => {
        // listen
        ipcRenderer.on('notify-user', (event, arg) => {
            // launch windows notification
            notify(arg);
        });
    }
};