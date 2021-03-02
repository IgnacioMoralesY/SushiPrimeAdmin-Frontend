import { DELETE_USER_HUELLA, GET_USERS_HUELLAS , HUELLA_LOADING, HUELLA_LOADING_OFF } from '../actions/types';
import { createReducer, Types as ReduxSauceTypes } from 'reduxsauce';

const INITIAL_STATE  = {
	getHuellas: [],
  loading: false
}

const fetchData = (state = INITIAL_STATE, action) => ({
    ...state,
    getHuellas: action.huellas
});

const remove = (state = INITIAL_STATE, action) => ({
    ...state,
    getHuellas: state.getHuellas.filter(huella => huella.id !== action.id ),
});

const loadingIni = (state = INITIAL_STATE) => ({
  ...state,
  loading: true
});

const loadingOff = (state = INITIAL_STATE) => ({
  ...state,
  loading: false
});

const HANDLERS = {
  [GET_USERS_HUELLAS]: fetchData,
  [DELETE_USER_HUELLA]: remove,
  [HUELLA_LOADING]: loadingIni,
  [HUELLA_LOADING_OFF]: loadingOff,
  
  [ReduxSauceTypes.DEFAULT]: state => state
}

export default createReducer(INITIAL_STATE, HANDLERS);