const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let ventanaPrincipal = null;

function crearVentanaPrincipal() {
    ventanaPrincipal = new BrowserWindow({
        width: 600,
        height: 500,
        resizable: false,
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

    ventanaPrincipal.setMenu(null);
}

app.once('ready', crearVentanaPrincipal);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length == 0) {
        crearVentanaPrincipal();
    }
});
