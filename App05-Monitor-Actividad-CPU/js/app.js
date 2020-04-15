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

            datos.push(datosCpu);
        }

        return datos;
    }

    generarVisualizacion() {
        this.grafico = new Chart($('#monitorCpuCanvas'), {
            type: 'doughnut',
            data: {
                labels: ['Tiempo de usuario (ms)', 'Tiempo de sistema (ms)', 'Tiempo libre (ms)'],
                datasets: this.obtenerConjuntoDatos()
            },
            options: {
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Actividad de CPU',
                    fontColor: 'rgb(250, 250, 250)',
                    fontSize: 19
                }
            }
        })
    }
}
