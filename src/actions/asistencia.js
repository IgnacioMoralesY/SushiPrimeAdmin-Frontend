import { GET_ASISTENCIAS } from './types';
import { getAsistenciasFetch } from '../services/asistencia';

export const getAll = () => dispatch => {
	getAsistenciasFetch()
		.then(response => {
			dispatch({
                type: GET_ASISTENCIAS,
                asistencias: response.asistencias
            });
		})
		.catch( () => {
			dispatch({
                type: GET_ASISTENCIAS,
                asistencias: []
            });
		});
};

