var Datastore = require('nedb');

let bd = new Datastore({filename: 'db/personas.db', autoload: true});

exports.agregarPerson = function(nombres, apellidos, correo){
    var persona = {
        nombres: nombres,
        apellidos: apellidos,
        correo: correo
    };

    bd.insert(persona, function(err, nuevoObjeto){

    });
};

exports.obtenerPersonas = function(operacion) {
    bd.find({}, function(err, personas){
        if(personas){
            operacion(personas);
        }
    });
};
