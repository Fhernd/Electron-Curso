const {elementos_gui} = require('./utilidades');
const {ipcRenderer} = require('electron');

class Temporizador {
    constructor(modo, minutos) {
        this.minutos = minutos;
        this.modo = modo;
        this.cuentaRegresiva = null;
        this.enEjecucion = false;
        this.id = null;
    }

    contador() {
        if (!this.enEjecucion) {
            clearInterval(this.id);
            return;
        }

        if (this.cuentaRegresiva == null) {
            this.cuentaRegresiva = this.minutos * 60 * 1000;
        }

        this.id = setInterval(() => {
            if (this.enEjecucion === true) {
                this.cuentaRegresiva -= 1000;

                console.log('Temporizador.contador.setInterval');

                let minutos = Math.floor(this.cuentaRegresiva / (60 * 1000));
                let segundos = Math.floor((this.cuentaRegresiva - (minutos * 60 * 1000)) / 1000);

                if (this.cuentaRegresiva <= 0) {
                    this.detener();

                    if (this.modo == 'concentrado') {
                        ipcRenderer.send('CuentaRegresivaCompletada');
                    } else if (this.modo == 'break') {
                        ipcRenderer.send('CerrarVentanaBreak');
                        ipcRenderer.send('AplicacionMaximizar');
                        ipcRenderer.send('IniciarSiguienteIteracion');
                    }
                } else if (this.cuentaRegresiva === 5000) {
                    this.renderizarMinutosSegundos(minutos, segundos)
                    ipcRenderer.send('AlertaBreak', this.modo);
                } else {
                    console.log('Temporizador.iniciar.contador.else-bef');
                    console.log(minutos, segundos);
                    console.log('Temporizador.iniciar.contador.else-aft');
                    this.renderizarMinutosSegundos(minutos, segundos);
                }
            }
        }, 1000);
    }

    iniciar() {
        console.log('Temporizador.iniciar');
        this.enEjecucion = true;
        this.contador();
    }

    pausar() {
        this.enEjecucion = false;
        clearInterval(this.id);
    }

    detener() {
        this.cuentaRegresiva = null;
        clearInterval(this.id);
        this.id = null;
        this.enEjecucion = false;
    }

    renderizarMinutosSegundos(minutos, segundos) {
        elementos_gui.RELOJ_MINUTOS.firstElementChild.innerHTML = minutos;
        elementos_gui.RELOJ_SEGUNDOS.firstElementChild.innerHTML = segundos;
    }

    estaEnEjecucion() {
        return this.enEjecucion();
    }
}

module.exports = Temporizador;
