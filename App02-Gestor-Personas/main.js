const {app, BrowserWindow, Menu} = require('electron');

let ventanaPrincipal;

let menuAplicacionPlantilla = [
    {
        label: 'Aplicación',
        submenu: [
            {
                label: 'Acerca de',
                click: () => {
                    abrirVentanaAcercaDe();
                }
            }
        ]
    }
];

function crearVentanaPrincipal(){
    ventanaPrincipal = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    });

    ventanaPrincipal.loadFile('index.html');

    let menu = Menu.buildFromTemplate(menuAplicacionPlantilla);
    ventanaPrincipal.setMenu(menu);

    ventanaPrincipal.on('closed', () => {
        ventanaPrincipal = null;
    });
}

function abrirVentanaAcercaDe() {

}

app.whenReady().then(crearVentanaPrincipal);
