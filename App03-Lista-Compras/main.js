const {app, BrowserWindow, Menu, ipcMain} = require('electron');

let ventanaPrincipal;
let ventanaNuevoProducto;

let menuPrincipalPlantilla = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Agregar producto',
                click() {
                    crearVentanaAgregarProducto()
                }
            },
            {
                label: 'Eliminar productos',
                click() {
                    ventanaPrincipal.webContents.send('productos:eliminar')
                }
            },
            {
                label: 'Salir',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

function crearVentanaAgregarProducto(){

}

function crearVentanaPrincipal(){
    ventanaPrincipal = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    ventanaPrincipal.loadFile('index.html');

    let menuPrincipal = Menu.buildFromTemplate(menuPrincipalPlantilla);
    ventanaPrincipal.setMenu(menuPrincipal);
}

app.whenReady().then(crearVentanaPrincipal);
