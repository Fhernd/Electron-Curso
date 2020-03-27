const baseDatos = require('./js/base-datos');

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
            <td><input type="button" class="btn btn-danger btn-sm" onclick="gestorPersonas.eliminarRegistroPersona('${persona._id}');" value="Eliminar"></td>
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

let gestorPersonas = new GestorPersonas();
