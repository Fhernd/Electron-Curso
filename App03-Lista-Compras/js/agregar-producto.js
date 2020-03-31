const {ipcRenderer} = require('electron');

function agregarProducto(evento){
    evento.preventDefault();

    let nombreProducto = document.querySelector('nombreProducto').value;
    console.log('Nombre producto:', nombreProducto);
    if (nombreProducto){
        ipcRenderer.send('producto:agregar', nombreProducto);
    }
}
console.log('agregar-producto.js')
document.querySelector('#frmAgregarProducto').addEventListener('submit', agregarProducto);