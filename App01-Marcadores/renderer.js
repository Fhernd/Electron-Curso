class Marcadores{
    constructor() {
        this.mensajeError = document.querySelector('.mensaje-error');
        this.formularioCreacionMarcadores = document.querySelector('.creacion-marcador-formulario');
        this.marcadorUrl = document.querySelector('.creacion-marcador-url');
        this.marcadorBoton = document.querySelector('.creacion-marcador-boton');
        this.marcadores = document.querySelector('.marcadores');
        this.eliminarMarcadores = document.querySelector('.remover-marcadores');

        this.parser = new DOMParser();

        this.agregarEventListeners();
    }

    agregarEventListeners(){
        this.marcadorUrl.addEventListener('keyup', () => {
            this.marcadorBoton.disabled = !this.marcadorUrl.validity.valid;
        });

        this.marcadorBoton.addEventListener('submit', this.crearMarcador.bind(this))
    }

    crearMarcador(evento) {
        evento.preventDefault();

        const url = this.marcadorUrl.nodeValue;

        fetch(url)
        .then(respuesta => respuesta.text())
        .then(this.extraerContenido)
        
    }

    extraerContenido(contenido){
        return this.parser.parseFromString(contenido, 'text/html');
    }
}