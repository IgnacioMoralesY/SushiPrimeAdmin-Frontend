import axios from 'axios';
const URL_API = process.env.REACT_APP_URL_API; 

export const getTiendasFetch = () => (
	axios.get(URL_API + '/api/tienda')
		.then(res => {
			return res.data
		})
		.catch(error => {
			console.log(error);
			return {error}
		})
);

export const saveNewTienda = (tienda) => (
	axios.post(URL_API + '/api/tienda', tienda, {})
		.then(res => {
			return res.data
		})
		.catch(error => {
			return {error}
		})
);

export const updateTienda = (tienda, id) => (
	axios.put(URL_API + '/api/tienda/'+id , tienda, {})
		.then(res => {
			return res.data
		})
		.catch(error => {
			return {error}
		})
);

export const deleteTiendaById = (id) => (
	axios.delete(URL_API + '/api/tienda/'+id)
		.then(res => {
			return res.data
		})
		.catch(error => {
			return {error}
		})
);




