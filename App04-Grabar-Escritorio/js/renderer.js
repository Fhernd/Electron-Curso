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

    menuFuentesEntrada.popup();
}

async function seleccionarFuente(fuenteEntrada) {
    seleccionarFuenteVideo.innerText = fuenteEntrada.name;

    const opcionesCaptura = {
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: fuenteEntrada.id
            }
        }
    };

    const streamCaptura = await navigator.mediaDevices.getUserMedia(opcionesCaptura);

    visualizacionCaptura.srcObject = streamCaptura;
    visualizacionCaptura.play();

    const opcionesFormato = {mimeType: 'video/webm; codecs=vp9'};
    grabadorMultimedia = new MediaRecorder(streamCaptura, opcionesFormato);

    grabadorMultimedia.ondataavailable = procesarDatos;
    grabadorMultimedia.onstop = detenerGrabacion;
}

function procesarDatos(evento) {
    partesGrabacion.push(evento.data);
}

async function detenerGrabacion(evento) {
    const blob = new Blob(partesGrabacion, {type: 'video/webm; codecs=vp9'});

    const buffer = Buffer.from(await blob.arrayBuffer());

    const {filePath} = await dialog.showSaveDialog({
       buttonLabel: 'Guardar vídeo' ,
       defaultPath: `vídeo-${Date.now()}.webm`
    });

    if (filePath) { 
        writeFile(filePath, buffer, () => {
            alert('Se ha guardado el archivo.');
        });
    }
}

let grabadorMultimedia;
const partesGrabacion = [];

let visualizacionCaptura = document.querySelector('#visualizacionCaptura');
let seleccionarFuenteVideo = document.querySelector('#seleccionarFuenteVideo');
let grabar = document.querySelector('#grabar');
let detener = document.querySelector('#detener');

seleccionarFuenteVideo.onclick = obtenerSeleccionarFuentesVideo;

grabar.addEventListener('click', () => {
    grabadorMultimedia.start();
    grabar.disabled = true;
});

detener.addEventListener('click', () => {
    grabadorMultimedia.onstop();
    grabar.disabled = false;
});
