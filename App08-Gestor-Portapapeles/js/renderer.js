const {clipboard, remote} = require('electron');
const jquery = require('jquery');
const dexie = require('dexie');
dexie.debug = true;
const historialPortapapeles = new dexie('historial');

let dato = jquery('#dato');
let tablaPortapapeles = jquery('#tablaPortapapeles');

remote.getCurrentWindow().on('show', () => {
    dato.focus();
});

jquery('body').on('keydown', function(evento) {
    // TODO: Actualizar tabla del portapapeles...
});
