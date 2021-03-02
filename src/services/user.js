import axios from 'axios';

const URL_API = process.env.REACT_APP_URL_API; 

export const getUsersFetch = () => (
	axios.get(URL_API + '/api/user')
		.then(res => {
			return res.data
		})
		.catch(error => {
			console.log(error);
			return {error}
		})
);

export const saveNewUser = (user) => (
	axios.post(URL_API + '/api/user', user, {})
		.then(res => {
			return res.data
		})
		.catch(error => {
			return {error}
		})
);

export const updateUser = (user, id) => (
	axios.put(URL_API + '/api/user/'+id , user, {})
		.then(res => {
			return res.data
		})
		.catch(error => {
			return {error}
		})
);

export const deleteUserById = (userId) => (
	axios.delete(URL_API + '/api/user/'+userId)
		.then(res => {
			return res.data
		})
		.catch(error => {
			return {error}
		})
);

export const loginUser = (user) => (
	axios.post(URL_API + '/api/user/login', user, {})
		.then(res => {
			return res.data
		})
		.catch(error => {
			return {error}
		})
);

export const bloquearUser = (id) => (
	axios.put(URL_API + '/api/user/bloquear/'+id , {}, {})
		.then(res => {
			return res.data
		})
		.catch(error => {
			return {error}
		})
);

export const desbloquearUser = (id) => (
	axios.put(URL_API + '/api/user/desbloquear/'+id , {}, {})
		.then(res => {
			return res.data
		})
		.catch(error => {
			return {error}
		})
);

