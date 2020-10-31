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

}

function pulsacionTeclas(evento) {
    
}
