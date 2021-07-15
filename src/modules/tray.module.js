const { Menu, Tray, nativeImage } = require('electron');

let tray = null;

const trayIcon = nativeImage.createFromPath('assets/icons/electron-logo-icon.png').resize({
    width: 18,
    height: 18,
});

module.exports = {
    setTray: () => {
        tray = new Tray(trayIcon);
        const contextMenu = Menu.buildFromTemplate([
            { label: 'Tray item 1', type: 'radio' },
            { label: 'Tray item 2', type: 'radio' },
            { label: 'Tray item 3', type: 'radio', checked: true }
        ]);
        tray.setToolTip('This text comes from tray module.');
        tray.setContextMenu(contextMenu);
    },
    destroy: () => {
        if (tray) {
            tray.destroy();
        }
    }
};
