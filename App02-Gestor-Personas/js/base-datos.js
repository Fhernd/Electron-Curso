var Datastore = require('nedb');

let bd = new Datastore({filename: 'db/personas.db', autoload: true});

exports.agregarPersona = function(nombres, apellidos, correo){
    var persona = {
        nombres: nombres,
        apellidos: apellidos,
        correo: correo
    };

    bd.insert(persona, function(error, nuevoObjeto){

    });
};

exports.obtenerPersonas = function(operacion) {
    bd.find({}, function(error, personas){
        if(personas){
            operacion(personas);
        }
    });
};

exports.eliminarPersona = function(id) {
    bd.remove({_id: id},  {}, function(error, numeroRegistrosEliminados){

    });
};
