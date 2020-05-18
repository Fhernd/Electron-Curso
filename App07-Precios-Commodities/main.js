const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let ventanaPrincipal = null;

app.once('ready', () => {
    ventanaPrincipal = new BrowserWindow({
        width: 600,
        height: 500,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    ventanaPrincipal.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    ventanaPrincipal.once('ready-to-show', () => {
        ventanaPrincipal.show();
    });
});
