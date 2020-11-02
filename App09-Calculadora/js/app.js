let teclas = document.querySelector('#calculadora span');
let operadores = ['+', '-', '*', '/'];
let puntoPresionado = false;

let pantalla = document.querySelector('.pantalla p');
let valorIngresado = pantalla.textContent;

for(let i = 0; i < teclas.length; ++i) {
    teclas[i].onclick = presionTecla;
}

document.addEventListener('keydown', pulsacionTeclas)

function presionTecla(evento, tecla) {
    let valorIngresado = pantalla.textContent;

    if (tecla == 'C') {
        limpiarPantalla();
    } else if (tecla == '=') {
        let ecuacion = valorIngresado;
        let ultimoCaracter = ecuacion[ecuacion.length - 1];

        if (operadores.indexOf(ultimoCaracter) != -1 || ultimoCaracter == '.') {
            ecuacion = ecuacion.replace(/.$/, '');
        }

        if (ecuacion) {
            pantalla.textContent = eval(ecuacion);
        }

        puntoPresionado = false;
    }
}

function pulsacionTeclas(evento) {

}

function limpiarPantalla() {

}
