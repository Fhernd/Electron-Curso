let teclas = document.querySelectorAll('#calculadora span');
let operadores = ['+', '-', '*', '/'];
let puntoPresionado = false;

let pantalla = document.querySelector('.pantalla p');
let valorIngresado = pantalla.textContent;

for(let i = 0; i < teclas.length; ++i) {
    teclas[i].onclick = presionTecla;
}

document.addEventListener('keydown', pulsacionTeclas)

function presionTecla(evento, tecla) {
    let valorIngresado = tecla || this.textContent;

    if (valorIngresado == 'C') {
        limpiarPantalla();
    } else if (valorIngresado == '=') {
        let ecuacion = valorIngresado;
        let ultimoCaracter = ecuacion[ecuacion.length - 1];

        if (operadores.indexOf(ultimoCaracter) != -1 || ultimoCaracter == '.') {
            ecuacion = ecuacion.replace(/.$/, '');
        }

        if (ecuacion) {
            pantalla.textContent = eval(ecuacion);
        }

        puntoPresionado = false;
    } else if (operadores.indexOf(valorIngresado) != -1) {
        let ultimoCaracter = valorIngresado[valorIngresado.length - 1];

        if (valorIngresado != '' && operadores.indexOf(ultimoCaracter) === -1) {
            pantalla.textContent += valorIngresado;
        } else if (valorIngresado == '' && valorIngresado == '-') {
            pantalla.textContent += valorIngresado;
        }

        if (operadores.indexOf(ultimoCaracter) != -1 && valorIngresado.length > 1) {
            pantalla.textContent = valorIngresado.replace(/.$/, valorIngresado);
        }

        puntoPresionado = false;
    } else if (valorIngresado == '.') {
        if (!puntoPresionado) {
            puntoPresionado = true;
            pantalla.textContent += valorIngresado;
        }
    } else {
        pantalla.textContent += valorIngresado;
    }

    evento.preventDefault();
}

function pulsacionTeclas(evento) {
    resaltarTecla(evento.key);

    if (evento.code.indexOf('Numpad') == 0) {
        if (evento.key == 'Enter') {
            return presionTecla(evento, '=');
        }

        presionTecla(evento, evento.key);
    } else if (!isNaN(+evento.key)) {
        presionTecla(evento, evento.key);
    } else if (evento.key == '+' || evento.key == '-' || evento.key == '/' || evento.key == '.' || evento.key == '=') {
        presionTecla(evento, evento.key);
    } else if (evento.key == 'Backspace') {
        pantalla = document.querySelector('.pantalla p');
        valorIngresado = pantalla.textContent;
        let contenido = valorIngresado.split('');
        contenido.pop();
        pantalla.textContent = contenido.join('');
    } else if (evento.key == 'c' || evento.key == 'C') {
        limpiarPantalla();
    } else if (evento.key == 'Enter') {
        presionTecla(evento, '=');
    }
}

function limpiarPantalla() {
    pantalla.textContent = '';
    puntoPresionado = false;
}

function resaltarTecla(tecla) {
    let teclaPresionada = document.querySelector(`span[data-tecla="${tecla}"]`);

    if (teclaPresionada) {
        teclaPresionada.classList.add('activa');

        setTimeout(() => {
            teclaPresionada.classList.remove('activa');
        }, 250);
    }
}
