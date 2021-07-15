// It has the same sandbox as a Chrome extension.
// All of the Node.js APIs are available in the preload process.
const dragAndDrop = require("./src/modules/drag.and.drop.module");
const messageSender = require("./src/modules/message.sender.module");
const {ipcRenderer} = require('electron');
const {notify} = require("./src/modules/notify.module");

window.addEventListener('DOMContentLoaded', () => {

    // window notification start listening
    messageSender.listenToWindowNotification();

    // create app loaded windows notification
    notify('Your Electron App has just been loaded!');

    // // write to channel
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

    // ipcRenderer.send('asynchronous-message', 'ping')

    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type]);
    }

    const button = document.getElementById('preview-notification');
    button.onclick = () => {
        notify('Well done!');
    };


    // create drag and drop
    dragAndDrop.init();

});
