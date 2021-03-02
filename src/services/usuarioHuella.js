import axios from 'axios';

const URL_API = process.env.REACT_APP_URL_API; 

export const getHuellasFetch = () => (
	axios.get(URL_API + '/api/huella')
		.then(res => {
			return res.data
		})
		.catch(error => {
			console.log(error);
			return {error}
		})
);


export const deleteHuella = (id) => (
	axios.delete(URL_API + '/api/huella/'+id)
		.then(res => {
			return res.data
		})
		.catch(error => {
			return {error}
		})
);



