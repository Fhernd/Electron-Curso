const {ipcRenderer, remote} = require('electron');

ipcRenderer.on('producto:agregar', function(evento, nombreProducto){
    localStorage.setItem(nombreProducto, nombreProducto);
    
    cargarListaCompras();
});

ipcRenderer.on('productos:eliminar', () => {
    localStorage.clear();

    cargarListaCompras();
});

function cargarListaCompras(){
    let html = Object.keys(localStorage).map(k => `<div class="list-group-item">${localStorage.getItem(k)}</div>`).join('');

    document.getElementById('listaCompras').innerHTML = html;
}

function eliminarProducto(evento){
    let nombreProducto = evento.target.innerText;

    localStorage.removeItem(nombreProducto);

    cargarListaCompras();
}

document.addEventListener('keydown', (e) => {
    if (e.which === 123){
        remote.getCurrentWindow().webContents.openDevTools();
    }
});

document.querySelector('#listaCompras').addEventListener('dblclick', eliminarProducto);

cargarListaCompras();
