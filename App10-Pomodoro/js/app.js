const {ipcRenderer, shell} = require('electron');
const {constantes, elementos_gui, reintentar} = require('./utilidades');
const Temporizador = require('./temporizador');

const STORAGE = localStorage;

let configuracionUsuario;
let modoConcentrado;

elementos_gui.BOTON_INICIAR.addEventListener('click', () => {
    elementos_gui.BOTON_PAUSAR.classList.add('oculto');
    elementos_gui.BOTON_INICIAR.classList.add('oculto');
    
    modoConcentrado.iniciar();
});

elementos_gui.BOTON_DETENER.addEventListener('click', () => {
    modoConcentrado.detener();

    validarEstado();

    configurarReloj();
});

elementos_gui.BOTON_PAUSAR.addEventListener('click', function() {
    elementos_gui.BOTON_INICIAR.classList.remove('oculto');
    elementos_gui.BOTON_PAUSAR.classList.remove('oculto');

    modoConcentrado.pausar();
});

function validarEstado() {
    // TODO: Pendiente de implementar...
}

function configurarReloj() {
    // TODO: Pendiente de implementar...
}
