const baseDatos = require('./base-datos');

class GestorPersonas {
    constructor() {
        this.frmNuevoRegistro = document.getElementById('frmNuevoRegistro');
        this.registros = document.getElementById('registros');
        this.nombres = document.getElementById('nombres');
        this.apellidos = document.getElementById('apellidos');
        this.correo = document.getElementById('correo');
        this.btnCrearRegistro = document.getElementById('btnCrearRegistro');

        this.cargarRegistrosPersona();
        this.agregarEventListeners();
    }

    agregarEventListeners() {
        this.frmNuevoRegistro.addEventListener('submit', this.crearRegistroPersona.bind(this));
        this.nombres.addEventListener('keyup', this.habilitarBotonCrearRegistro.bind(this));
        this.apellidos.addEventListener('keyup', this.habilitarBotonCrearRegistro.bind(this));
        this.correo.addEventListener('keyup', this.habilitarBotonCrearRegistro.bind(this));
    }

    habilitarBotonCrearRegistro() {
        if (this.nombres.value && this.apellidos.value && this.correo.validity.valid){
            this.btnCrearRegistro.disabled = false;
        }
    }

    crearRegistroPersona(evento) {
        evento.preventDefault();

        baseDatos.agregarPersona(this.nombres.value, this.apellidos.value, this.correo.value);

        this.nombres.value = '';
        this.apellidos.value = '';
        this.correo.value = '';

        this.cargarRegistrosPersona();
    }

    generarHtmlRegistroPersona(persona){
        return `<tr>
            <td>${persona.nombres}</td>
            <td>${persona.apellidos}</td>
            <td>${persona.correo}</td>
            <td><input type="button" class="btn btn-danger" onclick="${this.eliminarRegistroPersona(persona._id)}"></td>
        </tr>`;
    }

    cargarRegistrosPersona() {
        baseDatos.obtenerPersonas((personas) => {
            let html = personas.map(this.generarHtmlRegistroPersona).join('');

            this.registros.innerHTML = html;
        });
    }

    eliminarRegistroPersona(id) {
        baseDatos.eliminarPersona(id);

        this.cargarRegistrosPersona();
    }
}

new GestorPersonas();
