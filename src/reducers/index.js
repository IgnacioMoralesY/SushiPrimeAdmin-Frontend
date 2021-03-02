import { combineReducers } from 'redux';
import users from './user';
import userHuella from './usuarioHuella';
import tiendas from './tienda';
import messages from './message';
import asistencias from './asistencia';

export default combineReducers({
	users,
	userHuella,
	messages,
	tiendas,
	asistencias
});