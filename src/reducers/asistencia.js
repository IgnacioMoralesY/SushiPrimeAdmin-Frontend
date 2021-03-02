import { GET_ASISTENCIAS } from '../actions/types';
import { createReducer, Types as ReduxSauceTypes } from 'reduxsauce';

const INITIAL_STATE  = {
    getAsistencias: [],
}

const fetchData = (state = INITIAL_STATE, action) => ({
    ...state,
    getAsistencias: action.asistencias
});


const HANDLERS = {
  [GET_ASISTENCIAS]: fetchData,
  
  [ReduxSauceTypes.DEFAULT]: state => state
}

export default createReducer(INITIAL_STATE, HANDLERS);