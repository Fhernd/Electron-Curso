const {ipcRenderer, remote} = require('electron');

ipcRenderer.on('producto:agregar', function(evento, nombreProducto){
    localStorage.setItem(nombreProducto, nombreProducto);
    
    cargarListaProducto();
});

function cargarListaProducto(){
    let html = Object.keys(localStorage).map(k => `<div class="list-group-item">${localStorage.getItem(k)}</div>`).join('');

    document.getElementById('listaCompras').innerHTML = html;
}


document.addEventListener('keydown', (e) => {
    if (e.which === 123){
        remote.getCurrentWindow().webContents.openDevTools();
    }
})
