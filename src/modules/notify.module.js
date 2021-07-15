module.exports = {
    notify: (message) => {
        const notification = {
            title: 'Electron App',
            body: message,
            icon: 'assets/icons/check-ok.ico'
        };
        new window.Notification(notification.title, notification);
    }
};
