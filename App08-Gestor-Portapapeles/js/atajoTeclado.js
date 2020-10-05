const {clipboard, remote, globalshortcut, ipcRenderer} = require('electron');
const jquery = require('jquery');
const settings = require('electron-settings');

let atajoTeclado = document.querySelector('input');
let btnReestablecer = document.querySelector("button[type='reset']");
let btnEnviar = document.querySelector("button[type='submit']");

remote.getCurrentWindow().on('show', async function() {
    atajoTeclado.focus();

    atajoTeclado.value = await settings.get('atajoTecladoGlobal');
});

let teclasAtajoTeclado = [];

document.body.addEventListener('keyup', function(evento) {
    if (evento.key === 'Enter') {

    } else if (evento.key === 'Escape') {
        atajoTeclado.value = '';
        remote.getCurrentWindow().close();
    } else {
        atajoTeclado.focus();

        if (teclasAtajoTeclado.indexOf(evento.key) === -1) {
            teclasAtajoTeclado.push(evento.key);
        }

        atajoTeclado.value = teclasAtajoTeclado.join('+').replace('Control', 'CmdOrCtrl').replace('Arrow', '');

        return true;
    }
});
