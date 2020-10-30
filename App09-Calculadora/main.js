const electron = require('electron');
const path = require('path');
const {app, BrowserWindow, Menu, ipcMain, MenuItem} = electron;

let ventanaPrincipal;

app.on('ready', () => {
    ventanaPrincipal = new BrowserWindow({
        width: 350,
        height: 500,
        resizable: false,
        title: 'Calculadora',
        transparent: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    ventanaPrincipal.loadURL(`file://${__dirname}/index.html`);
});