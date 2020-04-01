const {app, BrowserWindow} = require('electron');
const path = require('path');

const crearVentanaPrincipal = () => {
    let ventanaPrincipal = new BrowserWindow({
        width: 700,
        height: 650,
        webPreferences: {
            nodeIntegration: true
        }
    });

    ventanaPrincipal.loadFile(path.join(__dirname, 'index.html'));
};

app.whenReady().then(crearVentanaPrincipal);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0){
        crearVentanaPrincipal();
    }
})
