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

        
    }
}

$(cargarPreciosCommodities);