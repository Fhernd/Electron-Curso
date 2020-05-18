const csv = require('papaparse');

function cargarPreciosCommodities() {
    let url;

    const commodities = {
        Petroleo: 'CL.F',
        Oro: 'GC.F',
        Plata: 'SI.F'
    };

    for (const commodity in commodities) {
        url = `https://stooq.com/q/l/?s=${commodities[commodity]}&f=sd2t2ohlc&h&e=csv`;

        csv.parse(url, {
            download: true,
            delimiter: ',',
            complete: (results) => {
                console.log(results);
                const registro = results.data[1];
                const precioAnterior = parseFloat(registro[3])
                const precioActual = parseFloat(registro[6]);

                let cambio = Math.round((precioActual - precioAnterior) * 100) / 100;

                if (cambio >= 0) {
                    cambio = `+${cambio}`;
                }

                $(`#precio${commodity}`).text(precioActual);
                $(`#cambio${commodity}`).text(cambio);
            }
        })
    }
}

$(cargarPreciosCommodities);
