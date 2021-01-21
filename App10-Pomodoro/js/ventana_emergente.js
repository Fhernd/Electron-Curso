const {elementos_gui, constantes} = require('./utilidades');
const {Temporizador} = require('./temporizador');

const DATOS_USUARIO = JSON.parse(localStorage.getItem(constantes.ALMACENAMIENTO_USUARIO));
let temporizadorBreak = new Temporizador('break', DATOS_USUARIO.break);

elementos_gui.RELOJ_MINUTOS.firstElementChild.innerHTML = DATOS_USUARIO.break;
elementos_gui.RELOJ_SEGUNDOS.firstElementChild.innerHTML = '00';

temporizadorBreak.iniciar();
