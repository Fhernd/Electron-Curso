const {desktopCapturer, remote} = require('electron');
const {writeFile} = require('fs');
const {dialog, Menu} = remote;

async function obtenerSeleccionarFuentesVideo() {
    const fuentesEntrada = await desktopCapturer.getSources({types: ['window', 'screen']});

    const menuFuentesEntrada = Menu.buildFromTemplate(
        fuentesEntrada.map(fuenteEntrada => {
            return {
                label: fuenteEntrada.name,
                click: () => seleccionarFuente(fuenteEntrada)
            };
        } )
    );

    
}

let grabadorMultimedia;
const partesGrabacion = [];

let visualizacionCaptura = document.querySelector('#visualizacionCaptura');
let seleccionarFuenteVideo = document.querySelector('#seleccionarFuenteVideo');
let grabar = document.querySelector('#grabar');
let detener = document.querySelector('#detener');

seleccionarFuenteVideo.onclick = obtenerSeleccionarFuentesVideo;
