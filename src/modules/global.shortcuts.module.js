const {sendMessage} = require('./message.sender.module');

const {globalShortcut} = require('electron');

module.exports = {
    registerShortcuts: () => {
        // Register a 'CommandOrControl+E' shortcut listener.
        const ret = globalShortcut.register('CommandOrControl+E', () => {
            sendMessage('CommandOrControl+E is pressed');
        });
        if (!ret) {
            sendMessage('Can\'t register CommandOrControl+E');
        }
    },
    unregisterShortcuts: () => {
        // Unregister a shortcut.
        globalShortcut.unregister('CommandOrControl+E');

        // Unregister all shortcuts.
        globalShortcut.unregisterAll();
    }
};