const path = require('path');

const {app, BrowserWindow, ipcMain} = require('electron');

const APLICACION_NOMBRE = require(path.join(__dirname, 'package.json')).name;
const APLICACION_VERSION = require(path.join(__dirname, 'package.json')).version;
const APLICACION_URL = require(path.join(__dirname, 'package.json')).repository.url;

const CONFIGURACION_PREDETERMINADA = {
    concentracion: 25,
    break: 5,
    iteraciones: 4
}

let iteracionActual = 1;
let iteracionUsuario = null;

app.allowRendererProcessReuse = true;

let ventanaPrincipal;
let ventanaSecundaria;

let notificaciones;

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
        alwaysOnTop: true,
        frame: false,
        resizable: false,
        show: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    ventanaSecundaria.loadURL(path.join('file://', __dirname, 'ventana_emergente.html'));
    ventanaSecundaria.maximize();
}

ipcMain.on('AplicacionNombre', (evento) => {
    evento.returnValue = APLICACION_NOMBRE;
});
ipcMain.on('AplicacionVersion', (evento) => {
    evento.returnValue = APLICACION_VERSION;
});
ipcMain.on('AplicacionUrl', (evento) => {
    evento.returnValue = APLICACION_URL;
});
ipcMain.on('AplicacionMaximizar', () => { ventanaPrincipal.show() });
ipcMain.on('AplicacionMinimizar', () => { ventanaPrincipal.minimize() });
ipcMain.on('CerrarVentanaBreak', () => { ventanaSecundaria.close() });
ipcMain.on('ConfiguracionPredeterminada', (evento) => { evento.returnValue = JSON.stringify(CONFIGURACION_PREDETERMINADA) });
ipcMain.on('SetIteracionUsuario', (e, iteracion) => {
    iteracionUsuario = Number(iteracion);
});

ipcMain.on('CuentaRegresivaCompletada', function(evento) {
    evento.sender.send('renderizarRelojPredeterminado');

    crearVentanaSecundaria();
    ventanaSecundaria.once('ready-to-show', () => {
        ventanaSecundaria.show();
    });
});

ipcMain.on('IniciarSiguienteIteracion', function() {
    if (iteracionActual < iteracionUsuario) {
        ventanaPrincipal.webContents.send('ReiniciarYEmpezar');
        ++iteracionActual;
    } else {
        iteracionActual = 1;
    }
});

ipcMain.on('CerrarAplicacion', () => {
    BrowserWindow.getAllWindows().forEach((ventana) => {
        ventana.close();
    });
});

ipcMain.on('AlertaBreak', function(evento, modo) {
    if (modo === 'break') {
        if (iteracionActual === iteracionUsuario) {
            return;
        }
    }

    notificaciones.alertaBreak({
        title: 'Información',
        modo: modo,
        mensaje: 'El temporizador Pomodoro empezará en 5 segundos.'
    });
});

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
