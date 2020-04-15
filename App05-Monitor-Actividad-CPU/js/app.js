const os = require('os');

/**
 * Representa la clase principal para monitorizar la actividad de CPU.
 */
class MonitorActividadCpu {
    /**
     * Función constructura e inicializadora de los elementos esenciales para crear una instancia de esta clase.
     */
    constructor() {
        this.grafico = null;
        this.medidasRecientesCpu = [];

        this.obtenerMedidasRecientesCpu(os.cpus());
        this.generarVisualizacion();
    }

    /**
     * Obtiene las medidas recientes de cada CPU adyancentes al sistema.
     * @param {*} cpus Conjunto de CPUs.
     */
    obtenerMedidasRecientesCpu(cpus) {
        for (let i = 0; i < cpus.length; i++) {
            this.medidasRecientesCpu[i] = this.obtenerTiemposCpu(cpus[i]);
        }
    }

    /**
     * Obtiene el tiempo (usuario, sistema, libre) de una CPU.
     * @param {*} cpu CPU sobre la que se consulta el tiempo.
     */
    obtenerTiemposCpu(cpu) {
        return [
            cpu.times.user,
            cpu.times.sys,
            cpu.times.idle
        ];
    }

    /**
     * Lee los datos de cada CPU para ser visualizados en una gráfica.
     */
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

    /**
     * Actualiza de forma recurrente los datos que se visualizan en la gráfica.
     */
    actualizarConjuntoDatos() {
        const cpus = os.cpus();

        for (let i = 0; i < cpus.length; i++) {
            const cpu = cpus[i];

            this.grafico.data.datasets[i].data = this.obtenerTiemposCpu(cpu);
            this.grafico.data.datasets[i].data[0] -= this.medidasRecientesCpu[i][0];
            this.grafico.data.datasets[i].data[1] -= this.medidasRecientesCpu[i][1];
            this.grafico.data.datasets[i].data[2] -= this.medidasRecientesCpu[i][2];
        }

        this.grafico.update();
        this.obtenerMedidasRecientesCpu(cpus);
    }

    /**
     * Genera visualización en un objeto tipo Chart. Configura la visualización acorde a los 
     * datos de las CPUs.
     */
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
                },
                legend: {
                    display: true,
                    labels: {
                        fontColor: 'rgb(250, 250, 250)',
                        fontSize: 12
                    }
                }
            }
        });

        setInterval(this.actualizarConjuntoDatos, 1000);
    }
}

$(() => {
    new MonitorActividadCpu();
});
