const path = require('path');

const {app, BrowserWindow, ipcMain} = require('electron');

const APLICACION_NOMBRE = require(path.join(__dirname, 'package.json')).name;
const APLICACION_VERSION = require(path.join(__dirname, 'package.json')).version;
const APLICACION_URL = require(path.join(__dirname, 'package.json')).repository.url;

const CONFIGURA_PREDETERMINADA = {
    concentracion: 25,
    break: 5,
    iteraciones: 4
}

let iteracionActual = 1;
let iteracionUsuario = null;

app.allowRendererProcessReuse = true;

let ventanaPrincipal;
let ventanaSecundaria;

// let notificaciones = new Notificacion();

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

function crearVentanaSecundaria() {
    ventanaSecundaria = new BrowserWindow({
        
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
