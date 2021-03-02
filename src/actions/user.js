import { DELETE_USER, SAVE_USER, GET_USERS , LOGIN_USER, USER_LOADING, USER_LOADING_OFF, LOGIN_USER_OUT, SET_PAYLOAD, UPDATE_USER, BLOQUEAR_USER, DESBLOQUEAR_USER } from './types';
import { getUsersFetch, saveNewUser, deleteUserById, loginUser, updateUser, bloquearUser, desbloquearUser } from '../services/user';
import { messageError } from '../Utils/getMessageError';
import { setMessage } from './messages';

export const remove = (userId) => dispatch => {
	let sendMessage = {
		title: 'Error!',
		message: 'Error interno!',
		status: 'error'
	}

	dispatch(loadingIni());
	deleteUserById(userId)
		.then(response => {
			if(response.error){
				sendMessage.message = messageError(response);
			}else{
				sendMessage.title = "Exito!";
                sendMessage.message = "Usuario Eliminado Exitosamente!";
                sendMessage.status = "success";
				dispatch(removeSuccess(userId));
			}

			dispatch(setMessage(sendMessage));
			dispatch(loadingOff());
		})
		.catch(() => {
			dispatch(setMessage(sendMessage));
			dispatch(loadingOff());
		});
};

export const save = (user) => dispatch => {
	let sendMessage = {
		title: 'Error!',
		message: 'Error interno!',
		status: 'error'
	}

	dispatch(loadingIni());
	saveNewUser(user)
		.then(response => {
			if(response.error){
				sendMessage.message = messageError(response);
			}else{
				sendMessage.title = "Exito!";
                sendMessage.message = "Usuario "+ user.nombre +" creado Exitosamente!";
                sendMessage.status = "success";
				dispatch(createdSuccess(response.user));
			}
			dispatch(setMessage(sendMessage));
			dispatch(loadingOff());
		})
		.catch(() => {
			dispatch(setMessage(sendMessage));
			dispatch(loadingOff());
		});
};

export const update = (user, id) => dispatch => {
	let sendMessage = {
		title: 'Error!',
		message: 'Error interno!',
		status: 'error'
	}

	dispatch(loadingIni());
	updateUser(user, id)
		.then(response => {
			if(response.error){
				sendMessage.message = messageError(response);
			}else{
				sendMessage.title = "Exito!";
                sendMessage.message = "Usuario "+ user.nombre +" modificado Exitosamente!";
                sendMessage.status = "success";
				dispatch(updateSuccess(response.user));
			}
			dispatch(setMessage(sendMessage));
			dispatch(loadingOff());
		})
		.catch(() => {
			dispatch(setMessage(sendMessage));
			dispatch(loadingOff());
		});
};

export const bloquear = (id) => dispatch => {
	let sendMessage = {
		title: 'Error!',
		message: 'Error interno!',
		status: 'error'
	}

	dispatch(loadingIni());
	bloquearUser(id)
		.then(response => {
			if(response.error){
				sendMessage.message = messageError(response);
			}else{
				sendMessage.title = "Exito!";
                sendMessage.message = "Usuario bloqueado Exitosamente!";
                sendMessage.status = "success";
				dispatch(bloquearSuccess(response.user));
			}
			dispatch(setMessage(sendMessage));
			dispatch(loadingOff());
		})
		.catch(() => {
			dispatch(setMessage(sendMessage));
			dispatch(loadingOff());
		});
};

export const desbloquear = (id) => dispatch => {
	let sendMessage = {
		title: 'Error!',
		message: 'Error interno!',
		status: 'error'
	}

	dispatch(loadingIni());
	desbloquearUser(id)
		.then(response => {
			if(response.error){
				sendMessage.message = messageError(response);
			}else{
				sendMessage.title = "Exito!";
                sendMessage.message = "Usuario Desbloqueado Exitosamente!";
                sendMessage.status = "success";
				dispatch(desbloquearSuccess(response.user));
			}
			dispatch(setMessage(sendMessage));
			dispatch(loadingOff());
		})
		.catch(() => {
			dispatch(setMessage(sendMessage));
			dispatch(loadingOff());
		});
};

export const login = (userLogin) => dispatch => {
	let sendMessage = {
		title: 'Error!',
		message: 'Error interno!',
		status: 'error'
	}
	
	dispatch(loadingIni());
	loginUser(userLogin)
		.then(response => {
			if(response.error){
				sendMessage.message = messageError(response);
			}else{
				sendMessage.title = "Exito!";
                sendMessage.message = "Has iniciado Sesión Exitosamente!";
                sendMessage.status = "success";
				dispatch(loginSuccess(response));
			}
			dispatch(setMessage(sendMessage));
			dispatch(loadingOff());
		})
		.catch(() => {
			dispatch(setMessage(sendMessage));
			dispatch(loadingOff());
		});
};

export const logOutUser = () => dispatch => {
	dispatch(loginOutUser());
};

export const get = () => dispatch => {
	getUsersFetch()
		.then(response => {
			dispatch({
                type: GET_USERS,
                users: response.users
            });
		})
		.catch( () => {
			dispatch({
                type: GET_USERS,
                users: []
            });
		});
};

export const setPayload = (payload) => dispatch => {
	dispatch({
		type: SET_PAYLOAD,
		payload
	});
};

const loadingIni = () => ({
	type: USER_LOADING
});

const loadingOff = () => ({
	type: USER_LOADING_OFF
});

const createdSuccess = newUser => ({
	type: SAVE_USER,
	newUser
});

const updateSuccess = (user) => ({
	type: UPDATE_USER,
	user
});

const bloquearSuccess = (user) => ({
	type: BLOQUEAR_USER,
	user
});

const desbloquearSuccess = (user) => ({
	type: DESBLOQUEAR_USER,
	user
});

const loginSuccess= (payload) => ({
	type: LOGIN_USER,
	payload
});

const loginOutUser= () => ({
	type: LOGIN_USER_OUT
});

const removeSuccess = (id) => ({
	type: DELETE_USER,
	id
});
