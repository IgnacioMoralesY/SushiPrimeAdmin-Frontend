import { DELETE_USER_HUELLA, GET_USERS_HUELLAS , HUELLA_LOADING, HUELLA_LOADING_OFF } from './types';
import { getHuellasFetch, deleteHuella } from '../services/usuarioHuella';
import { messageError } from '../Utils/getMessageError';
import { setMessage } from './messages';

export const removeHuella = (id) => dispatch => {
	let sendMessage = {
		title: 'Error!',
		message: 'Error interno!',
		status: 'error'
	}

	dispatch(loadingIni());
	deleteHuella(id)
		.then(response => {
			if(response.error){
				sendMessage.message = messageError(response);
			}else{
				sendMessage.title = "Exito!";
                sendMessage.message = "Huella Eliminada Exitosamente!";
                sendMessage.status = "success";
				dispatch(removeSuccess(id));
			}

			dispatch(setMessage(sendMessage));
			dispatch(loadingOff());
		})
		.catch(() => {
			 dispatch(setMessage(sendMessage));
			dispatch(loadingOff());
		});
};

export const getHuellas = () => dispatch => {
	getHuellasFetch()
		.then(response => {
			dispatch({
                type: GET_USERS_HUELLAS,
                huellas: response.huellas
            });
		})
		.catch( () => {
			dispatch({
                type: GET_USERS_HUELLAS,
                huellas: []
            });
		});
};

const loadingIni = () => ({
	type: HUELLA_LOADING
});

const loadingOff = () => ({
	type: HUELLA_LOADING_OFF
});

const removeSuccess = (id) => ({
	type: DELETE_USER_HUELLA,
	id
});
