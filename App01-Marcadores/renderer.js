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
        .then(this.encontrarTituloPagina)
        .then(titulo => this.almacenarMarcador(url, titulo))
        .then(this.limpiarFormulario)
        .then(this.visualizarMarcadores)
    }

    extraerContenido(contenido){
        return this.parser.parseFromString(contenido, 'text/html');
    }

    encontrarTituloPagina(html){
        return html.querySelector('title').innerText;
    }

    almacenarMarcador(url, titulo) {
        localStorage.setItem(url, JSON.stringify({titulo: titulo, url: url}));
    }

    limpiarFormulario() {
        this.marcadorUrl.value = null;
    }

    obtenerEnlaces() {
        return Object.keys(localStorage).map(k => JSON.parse(localStorage.getItem(k)));
    }

    generarHtmlMarcador(marcador){
        return `<div class="enlace"><h3>${marcador.titulo}</h3>
        <p><a href="${marcador.url}">${marcador.url}</a></p></div>`;
    }

    visualizarMarcadores() {
        let enlaces = this.obtenerEnlaces();

        let html = null;
    }
}