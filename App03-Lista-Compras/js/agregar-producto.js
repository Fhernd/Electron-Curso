const {ipcRenderer} = require('electron');

function agregarProducto(evento){
    evento.preventDefault();

    let nombreProducto = document.querySelector('nombreProducto').value;

    if (nombreProducto){
        ipcRenderer.send('producto:agregar', nombreProducto);
    }
}

document.querySelector('#frmAgregarProducto').addEventListener('submit', agregarProducto);