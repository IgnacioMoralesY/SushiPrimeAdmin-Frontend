import { DELETE_TIENDA, SAVE_TIENDA, GET_TIENDAS , TIENDA_LOADING, TIENDA_LOADING_OFF, UPDATE_TIENDA } from './types';
import { getTiendasFetch, saveNewTienda, deleteTiendaById, updateTienda } from '../services/tienda';
import { setMessage } from './messages';
import { messageError } from '../Utils/getMessageError';

export const remove = (id) => dispatch => {
	let sendMessage = {
		title: 'Error!',
		message: 'Error interno!',
		status: 'error'
	}

	dispatch(loadingIni());
	deleteTiendaById(id)
		.then(response => {
			if(response.error){
                sendMessage.message = messageError(response);
			}else{
                sendMessage.title = "Exito!";
                sendMessage.message = "Tienda Eliminada Exitosamente!";
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

export const save = (tienda) => dispatch => {
	let sendMessage = {
		title: 'Error!',
		message: 'Error interno!',
		status: 'error'
	}

	dispatch(loadingIni());
	saveNewTienda(tienda)
		.then(response => {
			if(response.error){
                sendMessage.message = messageError(response);
			}else{
                sendMessage.title = "Exito!";
                sendMessage.message = "Tienda "+ tienda.nombre +" creada exitosamente!";
                sendMessage.status = "success";
				dispatch(createdSuccess(response.tienda));
			}

            dispatch(setMessage(sendMessage));
			dispatch(loadingOff());
		})
		.catch(() => {
			dispatch(setMessage(sendMessage));
			dispatch(loadingOff());
		});
};

export const update = (tienda, id) => dispatch => {
	let sendMessage = {
		title: 'Error!',
		message: 'Error interno!',
		status: 'error'
	}
	
	dispatch(loadingIni());
	updateTienda(tienda, id)
		.then(response => {
			if(response.error){
				sendMessage.message = messageError(response);
			}else{
                sendMessage.title = "Exito!";
                sendMessage.message = "Tienda modificada exitosamente!";
                sendMessage.status = "success";
				dispatch(updateSuccess(response.tienda));
			}

            dispatch(setMessage(sendMessage));
			dispatch(loadingOff());
		})
		.catch(() => {
			dispatch(setMessage(sendMessage));
			dispatch(loadingOff());
		});
};

export const get = () => dispatch => {
	getTiendasFetch()
		.then(response => {
			dispatch({
                type: GET_TIENDAS,
                tiendas: response.tiendas
            });
		})
		.catch( () => {
			dispatch({
                type: GET_TIENDAS,
                tiendas: []
            });
		});
};

const loadingIni = () => ({
	type: TIENDA_LOADING
});

const loadingOff = () => ({
	type: TIENDA_LOADING_OFF
});

const createdSuccess = tienda => ({
	type: SAVE_TIENDA,
	tienda
});

const updateSuccess = (tienda) => ({
	type: UPDATE_TIENDA,
	tienda
});

const removeSuccess = (id) => ({
	type: DELETE_TIENDA,
	id
});
