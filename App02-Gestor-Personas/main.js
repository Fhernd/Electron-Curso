const {app, BrowserWindow, Menu} = require('electron');

let ventanaPrincipal;

function crearVentanaPrincipal(){
    ventanaPrincipal = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    });

    ventanaPrincipal.loadFile('index.html');
}

app.whenReady().then(crearVentanaPrincipal);
