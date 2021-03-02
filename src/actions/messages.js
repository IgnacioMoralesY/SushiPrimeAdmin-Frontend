import { CLEAR_MESSAGE, SET_MESSAGE} from './types';

export const clearMessage = () => ({
	type: CLEAR_MESSAGE
});

export const setMessage = (message) => dispatch => {
	dispatch({
		type: SET_MESSAGE,
        messages: {
            title: message.title,
            message: message.message,
            status: message.status
        }
	});
};

