const csv = require('papaparse');

function cargarPreciosCommodities() {
    let url;

    const commodities = {
        petroleo: 'CL.F',
        oro: 'GC.F',
        silver: 'SI.F'
    };

    for (const commodity in commodities) {
        url = `https://stooq.com/q/?s=${commodities[commodity]}&f=sd2t2ohlc&h&e=csv`;

        csv.parse(url, {
            download: true,
            delimiter: ',',
            complete: (results) => {
                const registro = results.data[1];
                const precioAnterior = parseFloat(registro[3])
                const precioActual = parseFloat(registro[6]);

                let cambio = Math.round((precioActual - precioAnterior) * 100) / 100;
            }
        })
    }
}

$(cargarPreciosCommodities);