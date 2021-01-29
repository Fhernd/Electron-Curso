module.exports.elementos_gui = {
    BOTON_CERRAR: document.querySelector('.boton-cerrar'),
    BOTON_MINIMIZAR: document.querySelector('.boton-minimizar'),
    BOTON_TEMPORIZADOR: document.querySelector('.boton-temporizador'),
    BOTON_ACERCA_DE: document.querySelector('.btn-acerca-de'),
    BOTON_INICIAR: document.querySelector('.boton-iniciar'),
    BOTON_PAUSAR: document.querySelector('.boton-pausar'),
    BOTON_GUARDAR: document.querySelector('.boton-guardar'),
    BOTON_REINICIAR: document.querySelector('.boton-reiniciar'),
    BOTON_DETENER: document.querySelector('.boton-detener'),
    AREA_CONFIGURACION_BASICA: document.querySelector('.configuracion-basica-area'),
    AREA_CONFIGURACION: document.querySelector('.configuracion-area'),
    RELOJ_MINUTOS: document.querySelector('.reloj-minutos'),
    RELOJ_SEGUNDOS: document.querySelector('.reloj-segundos'),
    RANGO_VALOR: document.querySelector('.configuracion-rango-valor'),
    VENTANA_ACERCA_DE: document.querySelector('.acerca-de')
}

module.exports.constantes = {
    ALMACENAMIENTO_USUARIO: 'ALMACENAMIENTO_USUARIO',
    ALMACENAMIENTO_PREDETERMINADO: 'ALMACENAMIENTO_PREDETERMINADO'
}

module.exports.optimizar = (fn, retraso) => {
    let reintento;

    return function() {
        const contexto = this;
        const argumentos = arguments;
        clearTimeout(reintento)

        reintento = setTimeout(() => fn.apply(contexto, argumentos), retraso);
    }
}
