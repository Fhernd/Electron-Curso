const path = require('path');

const {app, BrowserWindow, ipcMain} = require('electron');

let ventanaPrincipal;

function crearVentanaPrincipal() {
    ventanaPrincipal = new BrowserWindow({
        width: 450,
        height: 400,
        resizable: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    ventanaPrincipal.loadURL(path.join('file://', __dirname, 'index.html'));
    ventanaPrincipal.on('close', () => {
        ventanaPrincipal = null
    });
    
    ventanaPrincipal.once('ready-to-show', () => {
        ventanaPrincipal.show();
    });
}

app.on('ready', () => {
    crearVentanaPrincipal();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (ventanaPrincipal === null) {
        crearVentanaPrincipal();
    }
});

const unicaInstancia = app.requestSingleInstanceLock();

if (!unicaInstancia) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (ventanaPrincipal.isMaximized()) {
            ventanaPrincipal.restore();
        }
        
        ventanaPrincipal.focus();
    });
}
