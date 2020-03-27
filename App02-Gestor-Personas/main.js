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
    let ventanaAcercaDe = new BrowserWindow({
        parent: ventanaPrincipal,
        modal: true,
        show: false,
        width: 400,
        height: 250
    });

    ventanaAcercaDe.loadFile('acerca-de.html');
    ventanaAcercaDe.setMenu(null);
    ventanaAcercaDe.once('ready-to-show', () => {
        ventanaAcercaDe.show();
    });
}

app.whenReady().then(crearVentanaPrincipal);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () => {
    if (ventanaPrincipal === null){
        crearVentanaPrincipal();
    }
});
