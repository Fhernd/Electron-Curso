const {ipcRenderer} = require('electron');

ipcRenderer.on('producto:agregar', function(evento, producto){
    let nuevoProductoHtml = `<div class="list-group-item">${producto}</div>`;

    let listaCompras = document.getElementById('listaCompras');
});
