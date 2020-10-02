const {app, BrowserWindow, clipboard, globalShortcut, ipcMain, Menu, Tray} = require('electron');
const path = require('path');
const settings = require('electron-settings');

if (!app.requestSingleInstanceLock()) {
    app.quit();
}

async function iniciarAplicacion() {
    const ventanaPrincipal = new BrowserWindow({
        width: 400,
        height: 650,
        frame: false,
        resizable: false,
        minimizable: false,
        maximizable: false,
        show: false,
        title: 'Clips de portapeles',
        webPreferences: {
            preload: path.join(__dirname, 'js', 'preload.js'),
            nodeIntegration: true
        }
    });

    ventanaPrincipal.setMenuBarVisibility(false);
    ventanaPrincipal.loadFile('index.html');

    const atajoTecladoVentana = new BrowserWindow({
        width: 400,
        height: 650,
        frame: false,
        resizable: false,
        minimizable: false,
        maximizable: false,
        show: false,
        title: 'Atajo teclado',
        webPreferences: {
            nodeIntegration: true
        }
    });

    atajoTecladoVentana.setMenuBarVisibility(false);
    atajoTecladoVentana.loadFile('atajoTeclado.html');

    atajoTecladoVentana.on('close', (evento) => {
        if (!app.isQuiting) {
            evento.preventDefault();
            atajoTecladoVentana.hide();
        }

        return false;
    });

    ventanaPrincipal.on('minimize', (evento) => {
        evento.preventDefault();
        ventanaPrincipal.hide();
    });

    ventanaPrincipal.on('close', (evento) => {
        if (!app.isQuiting) {
            evento.preventDefault();
            ventanaPrincipal.hide();
        }
    });

    const iconos = {
        darwin: 'images/16x16.png',
        linux: 'images/64x64',
        win32: 'images/64x64'
    }

    let areaBandeja = new Tray(path.join(__dirname, iconos[process.platform]));
    areaBandeja.setToolTip('Mostrar el historial del portapapeles');

    // TODO: plantilla opciones ícono bandeja de entrada (área de notificaciones).
}
