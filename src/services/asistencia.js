import axios from 'axios';
const URL_API = process.env.REACT_APP_URL_API; 

export const getAsistenciasFetch = () => (
	axios.get(URL_API + '/api/asistencia/getAll')
		.then(res => {
			return res.data
		})
		.catch(error => {
			console.log(error);
			return {error}
		})
);




