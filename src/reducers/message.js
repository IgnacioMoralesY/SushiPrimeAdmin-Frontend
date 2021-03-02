import { CLEAR_MESSAGE, SET_MESSAGE } from '../actions/types';
import { createReducer, Types as ReduxSauceTypes } from 'reduxsauce';

const INITIAL_STATE  = {
  sendMessage: false,
  messages: {
      title: '',
      message: '',
      status: ''
  },
  loading: false
}

const clearMessage = (state = INITIAL_STATE) => ({
    ...state,
    sendMessage: false,
    messages: {
      title: '',
      message: '',
      status: ''
    }
});

const setMessage = (state = INITIAL_STATE, action) => ({
    ...state,
    sendMessage: true,
    messages: action.messages
});

const HANDLERS = {
  [CLEAR_MESSAGE]: clearMessage,
  [SET_MESSAGE]: setMessage,
  
  [ReduxSauceTypes.DEFAULT]: state => state
}

export default createReducer(INITIAL_STATE, HANDLERS);