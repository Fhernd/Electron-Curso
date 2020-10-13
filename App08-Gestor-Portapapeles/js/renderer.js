const {clipboard, remote} = require('electron');
const jquery = require('jquery');
const dexie = require('dexie');
dexie.debug = true;
const bd = new dexie('historial');

// let dato = jquery('#dato');
let dato = document.querySelector('input');
// let tablaPortapapeles = jquery('#tablaPortapapeles');
let tablaPortapapeles = document.querySelector('table');
// tablaPortapapeles.on('click', cambiarDatoSeleccionado);
tablaPortapapeles.addEventListener('click', cambiarDatoSeleccionado);

remote.getCurrentWindow().on('show', () => {
    dato.focus();
});

document.body.addEventListener('keydown', function(evento) {
    let filas = Array.from(document.querySelectorAll('tr td:first-child'));

    let indice = filas.indexOf(document.activeElement);

    if (evento.key === 'ArrowUp') {
        let siguienteDato = filas[indice - 1] || filas[filas.length - 1];
        siguienteDato.focus();
    } else if (evento.key === 'ArrowDown') {
        let siguienteDato = filas[indice + 1] || filas[0];
        siguienteDato.focus();
    } else if (evento.key === 'Enter') {
        cambiarDatoSeleccionado(evento);
    } else if (evento.key === 'Escape') {
        dato.value = '';
        refrescarVista();
        remote.getCurrentWindow().close();
    } else {
        dato.focus();
        refrescarVista();
    }
});

async function cambiarDatoSeleccionado(evento) {
    if (evento.target.id) {
        if (clipboard.readText() === (await bd.historial.get(parseInt(evento.target.id))).text) {
            return;
        }

        if(evento.target.tagName === 'TD') {
            clipboard.writeText((await bd.historial.get(parseInt(evento.target.id))).text);
        }

        refrescarVista();
    }
}

function refrescarVista() {
    bd.historial.count((e) => {
        dato.value = `Buscar entre ${e} elementos...`;
    });

    return bd.historial.limit(50).desc()
        .filter((h) => {
            return !dato.value || h.text.toLowerCase().indexOf(dato.value.toLowerCase()) !== -1;
        })
        .toArray()
        .then((h) => {
            tablaPortapapeles.innerHTML = '';

            let indice = 0;

            h.forEach((e) => {
                let registro = document.createElement('tr')
                ++indice;
                
                registro.innerHTML = `<tr><td tabindex="${indice}" id="${e.id}"> </td><td><button id="${e.id}">&#10006;</button></td></tr>`;

                registro.querySelector('td').innerText = e.textoi.replace(/\n/g, ' ');

                tablaPortapapeles.appendChild(registro);
            });
        });
}

setTimeout(async () => {
    await bd.version(1).stores({historial: '++id,texto'});

    refrescarVista();

    let texto = clipboard.readText();

    setInterval(async () => {
        if (texto !== clipboard.readText()) {
            texto = clipboard.readText();

            bd.historial.add({texto: texto}).then(refrescarVista);
        }
    }, 200);
})
