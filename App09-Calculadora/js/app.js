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
    } else if (tecla == '.') {
        if (!puntoPresionado) {
            puntoPresionado = true;
            pantalla.textContent += tecla;
        }
    } else {
        pantalla.textContent += tecla;
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
