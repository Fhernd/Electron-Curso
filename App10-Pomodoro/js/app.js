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
