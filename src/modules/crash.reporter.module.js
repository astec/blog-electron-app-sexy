const {sendMessage} = require("./message.sender.module");
const {app, crashReporter} = require('electron');

const reportsPath = app.getAppPath() + '/logs/crashes';

module.exports = {
    init: () => {
        app.setPath('crashDumps', reportsPath);
    },
    start: () => {
        crashReporter.start({
            submitURL: 'https://your-domain.com/url-to-submit',
            uploadToServer: false,
            compress: true
        });
    }
};