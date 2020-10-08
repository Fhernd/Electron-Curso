const {clipboard, remote} = require('electron');
const jquery = require('jquery');
const dexie = require('dexie');
dexie.debug = true;
const historialPortapapeles = new dexie('historial');

let dato = jquery('#dato');
let tablaPortapapeles = jquery('#tablaPortapapeles');
tablaPortapapeles.on('click', cambiarDatoSeleccionado);

remote.getCurrentWindow().on('show', () => {
    dato.focus();
});

jquery('body').on('keydown', function(evento) {
    let filas = Array.from(document.querySelectorAll('tr td:first-child'));

    let indice = filas.indexOf(document.activeElement);

    if (evento.key === 'ArrowUp') {
        let siguienteDato = filas[indice - 1] || filas[filas.length - 1];
        siguienteDato.focus();
    } else if (evento.key === 'ArrowDown') {
        let siguienteDato = filas[indice + 1] || filas[0];
        siguienteDato.focus();
    } else if (evento.key === 'Enter') {
        cambiarDatoSeleccionado();
    } else if (evento.key === 'Escape') {
        dato.value = '';
        refrescarVista();
        remote.getCurrentWindow().close();
    } else {
        dato.focus();
        refrescarVista();
    }
});

function cambiarDatoSeleccionado() {
    // TODO...
}

function refrescarVista() {
    // TODO...
}
