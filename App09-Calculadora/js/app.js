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
    } else if (operadores.indexOf(tecla) != -1) {
        let ultimoCaracter = valorIngresado[valorIngresado.length - 1];

        if (valorIngresado != '' && operadores.indexOf(ultimoCaracter) === -1) {
            pantalla.textContent += tecla;
        } else if (valorIngresado == '' && tecla == '-') {
            pantalla.textContent += tecla;
        }

        if (operadores.indexOf(ultimoCaracter) != -1 && valorIngresado.length > 1) {
            pantalla.textContent = valorIngresado.replace(/.$/, tecla);
        }

        puntoPresionado = false;
    }
}

function pulsacionTeclas(evento) {

}

function limpiarPantalla() {

}
