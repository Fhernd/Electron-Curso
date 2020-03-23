const {app, BrowserWindow} = require('electron');
const path = require('path');

function crearVentanaPrincipal() {
    let ventanaPrincipal = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    ventanaPrincipal.loadFile('index.html');
}

app.whenReady().then(crearVentanaPrincipal);
