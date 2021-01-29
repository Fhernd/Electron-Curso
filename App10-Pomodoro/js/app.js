const {ipcRenderer, shell} = require('electron');
const {constantes, elementos_gui, optimizar} = require('./utilidades');
const Temporizador = require('./temporizador');

const STORAGE = localStorage;

let configuracionUsuario;
let temporizador;

elementos_gui.BOTON_INICIAR.addEventListener('click', () => {
    elementos_gui.BOTON_PAUSAR.classList.add('oculto');
    elementos_gui.BOTON_INICIAR.classList.add('oculto');
    
    temporizador.iniciar();
});

elementos_gui.BOTON_DETENER.addEventListener('click', () => {
    temporizador.detener();

    validarEstado();

    configurarReloj();
});

elementos_gui.BOTON_PAUSAR.addEventListener('click', function() {
    elementos_gui.BOTON_INICIAR.classList.remove('oculto');
    elementos_gui.BOTON_PAUSAR.classList.remove('oculto');

    temporizador.pausar();
});

function validarEstado() {
    if (!temporizador.estaEnEjecucion()) {
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

    temporizador.detener();

    temporizador = new Temporizador('concentrado', configuracionUsuario.concentrado);

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
    if (elementos_gui.AREA_CONFIGURACION.classList.contains('icono-activo')) {
        alternarEstadoRelojIzquierda();
    }

    elementos_gui.VENTANA_ACERCA_DE.classList.toggle('lado-derecho');
    elementos_gui.BOTON_ACERCA_DE.classList.toggle('icono-activo');
}

function cerrarVentana() {
    ipcRenderer.send('CerrarAplicacion');
}

function minimizarVentana() {
    ipcRenderer.send('AplicacionMinimizar');
}

function mostrarPanelLateral() {
    elementos_gui.RANGO_VALOR.forEach((r) => {
        let modoTrabajo = r.dataset.modo;
        let contenido = r.parentNode.firstElementChild.lastElementChild;

        switch(modoTrabajo) {
            case 'focalizado':
                mostrarValor(r, contenido, modoTrabajo);
                break;
            case 'break':
                mostrarValor(r, contenido, modoTrabajo);
                break;
            case 'iteraciones':
                mostrarValor(r, contenido, modoTrabajo);
                break;
        }

        r.addEventListener('input', optimizar(function(evento) {
            evento.srcElement.previousElementSibling.lastElementChild.textContent = `${evento.target.value}`;
            configuracionUsuario[evento.srcElement.dataset.modo] = Number(evento.target.value);

            ipcRenderer.send('EstablecerIteracionUsuario', configuracionUsuario.iteraciones);
        }, 30));
    });

    ipcRenderer.send('EstablecerIteracionUsuario', configuracionUsuario.iteraciones);
}

function mostrarValor(input, contenido, modoTrabajo) {
    input.value = configuracionUsuario[modoTrabajo];
    contenido.innerHTML = `${configuracionUsuario[modoTrabajo]}`;
}

elementos_gui.BOTON_CERRAR.addEventListener('click', cerrarVentana);

elementos_gui.BOTON_MINIMIZAR.addEventListener('click', minimizarVentana);

elementos_gui.AREA_CONFIGURACION.addEventListener('click', alternarEstadoRelojIzquierda);

elementos_gui.BOTON_ACERCA_DE.addEventListener('click', alternarEstadoRelojDerecha);

elementos_gui.BOTON_REINICIAR.addEventListener('click', () => {
    STORAGE.setItem(constantes.ALMACENAMIENTO_USUARIO, ipcRenderer.sendSync('ConfiguracionPredeterminada'));

    configuracionUsuario = JSON.parse(STORAGE.getItem(constantes.ALMACENAMIENTO_PREDETERMINADO));

    temporizador.detener();

    validarEstado();
    configurarReloj();
    alternarEstadoRelojIzquierda();
    mostrarPanelLateral();
});

elementos_gui.BOTON_GUARDAR.addEventListener('click', guardarDatos);

window.addEventListener('load', () => {
    if (!STORAGE.getItem(constantes.ALMACENAMIENTO_USUARIO) || !STORAGE.getItem(constantes.ALMACENAMIENTO_PREDETERMINADO)) {
        STORAGE.setItem(constantes.ALMACENAMIENTO_PREDETERMINADO, ipcRenderer.sendSync('ConfiguracionPredeterminada'));
    }
});
