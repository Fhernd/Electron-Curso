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
    if (!modoConcentrado.estaEnEjecucion()) {
        elementos_gui.BOTON_INICIAR.classList.remove('oculto');
        elementos_gui.BOTON_PAUSAR.classList.remove('oculto');
    } else {
        elementos_gui.BOTON_INICIAR.classList.add('oculto');
        elementos_gui.BOTON_PAUSAR.classList.add('oculto');
    }
}

function configurarReloj() {
    elementos_gui.RELOJ_MINUTOS.firstElementChild.innerHTML = configuracionUsuario.concentrado;
    elementos_gui.RELOJ_SEGUNDOS.firstElementChild.innerHTML = '00';
}

function guardarDatos() {
    STORAGE.setItem(constantes.ALMACENAMIENTO_USUARIO, JSON.stringify(configuracionUsuario));

    modoConcentrado.detener();

    modoConcentrado = new Temporizador('concentrado', configuracionUsuario.concentrado);

    validarEstado();

    configurarReloj();

    alternarEstadoRelojIzquierda();
}

function alternarEstadoRelojIzquierda() {
    if (elementos_gui.BOTON_ACERCA_DE.classList.contains('icono-activo')) {
        alternarEstadoRelojDerecha();
    }

    elementos_gui.AREA_CONFIGURACION_BASICA.classList.toggle('lado-izquierdo');
    elementos_gui.AREA_CONFIGURACION.classList.toggle('icono-activo');
}

function alternarEstadoRelojDerecha() {
    // TODO: Pendiente de implementar...
}
