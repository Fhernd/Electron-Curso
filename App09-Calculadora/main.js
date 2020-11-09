const electron = require('electron');
const path = require('path');
const {app, BrowserWindow, Menu, ipcMain, MenuItem} = electron;

let ventanaPrincipal;

app.on('ready', () => {
    ventanaPrincipal = new BrowserWindow({
        width: 450,
        height: 600,
        resizable: true,
        title: 'Calculadora',
        transparent: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    ventanaPrincipal.loadURL(`file://${__dirname}/index.html`);

    ventanaPrincipal.webContents.openDevTools();

    let plantillaMenu = Menu.buildFromTemplate([
        {
            label: 'Opciones',
            submenu: [
                {
                    label: 'Recargar',
                    accelerator: 'CommandOrControl+R',
                    role: 'reload'
                },
                {
                    label: 'Salir',
                    accelerator: 'CommandOrControl+W',
                    role: 'close'
                }
            ]
        }
    ]);

    Menu.setApplicationMenu(plantillaMenu);
});

let menuPrincipal = new Menu();
menuPrincipal.append(
    new MenuItem({
        label: 'Recargar',
                    accelerator: 'CommandOrControl+R',
                    role: 'reload'
    })
);
menuPrincipal.append(
    new MenuItem({
        label: 'Salir',
        accelerator: 'CommandOrControl+W',
        role: 'close'
    })
);

app.on('browser-window-created', function(evento, ventana) {
    ventana.webContents.on('context-menu', function(e, parametros) {
        menuPrincipal.popup(ventana, parametros.x, parametros.y);
    });
});

ipcMain.on('show-context-meenu', function(evento) {
    let ventana = BrowserWindow.fromWebContents(evento.sender);
    menuPrincipal.popup(ventana);
})
