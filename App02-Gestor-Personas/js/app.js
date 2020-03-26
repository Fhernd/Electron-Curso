const baseDatos = require('./js/base-datos');

class GestorPersonas {
    constructor() {
        this.frmNuevoRegistro = document.getElementById('frmNuevoRegistro');

        this.cargarRegistrosPersona();
        this.agregarEventListeners();
    }

    agregarEventListeners() {
        this.frmNuevoRegistro.addEventListener('submit', this.crearRegistroPersona.bind(this))
    }

    crearRegistroPersona() {

    }

    cargarRegistrosPersona() {
        baseDatos.obtenerPersonas(function(personas){
            
        });
    }
}
