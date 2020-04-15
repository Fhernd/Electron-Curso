const os = require('os');

class MonitorActividadCpu {
    constructor() {
        this.grafico = null;
        this.medidasRecientesCpu = [];


    }

    obtenerMedidasRecientesCpu(cpus) {
        for (let i = 0; i < cpus.length; i++) {
            this.medidasRecientesCpu[i] = this.obtenerTiemposCpu(cpus[i]);
        }
    }

    obtenerTiemposCpu(cpu) {
        return [
            cpu.times.user,
            cpu.times.sys,
            cpu.times.idle
        ];
    }

    obtenerConjuntoDatos() {
        let datos = [];
        const cpus = os.cpus();

        for (let i = 0; i < cpus.length; i++) {
            const cpu = cpus[i];
            
            let datosCpu = {
                data: this.obtenerTiemposCpu(cpu),
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ]
            }
        }
    }
}
