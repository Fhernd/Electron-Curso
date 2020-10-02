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
}
