const {Menu, shell, app, dialog} = require('electron');
const updater = require("./updater.module");

module.exports = {
    create: (mainWindow) => {
        const menu = Menu.buildFromTemplate([
            {
                label: 'Menu',
                submenu: [
                    {
                        label: 'Preview notification',
                        click() {
                            mainWindow.webContents.send('notify-user', 'Thanks for clicking!');
                        }
                    },
                    {
                        label: 'Rublon MFA - website',
                        click() {
                            shell.openExternal('https://rublon.com');
                        }
                    },
                    {
                        label: 'Check for Update',
                        click(){
                            updater.checkForUpdates();
                        }
                    },
                    {
                        label: 'Exit',
                        click(){
                            app.quit();
                        }
                    }
                ]
            },
            {
                label: 'Version',
                click(){
                    dialog.showMessageBox({
                        title: 'Version',
                        message: `Current version is ${app.getVersion()}.`
                      })
                }
            }
        ]);
        Menu.setApplicationMenu(menu);
    }
};