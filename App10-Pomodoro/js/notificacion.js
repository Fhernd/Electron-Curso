const notifier = require('node-notifier');

const path = require('path');

class Notificacion {
    crearNotificacion(titulo, icono, mensaje, modo) {
        notifier.notify({
            title: titulo,
            icono: path.join(__dirname, '/../images/icons', icono),
            message: `${mensaje} ${modo}`,
            sound: true,
            appID: 'pomodoro'
        });
    }

    alertaBreak(opciones) {
        let modoSiguiente;
        let icono;

        switch(opciones.modo) {
            case 'focalizado':
                modoSiguiente = 'break';
                icono = `${modoSiguiente}.png`;
                break;
            case 'break':
                modoSiguiente = 'focalizado';
                icono = `${modoSiguiente}.png`;
                break;
        }

        this.crearNotificacion(opciones.titulo, icono, opciones.mensaje, modoSiguiente);
    }
}

module.exports = Notificacion;
