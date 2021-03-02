import { DELETE_TIENDA, SAVE_TIENDA, GET_TIENDAS , TIENDA_LOADING, TIENDA_LOADING_OFF, UPDATE_TIENDA } from '../actions/types';
import { createReducer, Types as ReduxSauceTypes } from 'reduxsauce';

let tiendaEmpty = {
    id: 0,
    nombre: ""
};

const INITIAL_STATE  = {
    getTiendas: [],
    newTienda: tiendaEmpty,
    loading: false
}

const fetchData = (state = INITIAL_STATE, action) => ({
    ...state,
    getTiendas: action.tiendas
});

const remove = (state = INITIAL_STATE, action) => ({
    ...state,
    getTiendas: state.getTiendas.filter(tienda => tienda.id !== action.id )
});

const save = (state = INITIAL_STATE, action) => ({
    ...state,
    getTiendas: state.getTiendas.concat(action.tienda)
});

const update = (state = INITIAL_STATE, action) => {
  let index = state.getTiendas.findIndex(tienda => tienda.id === action.tienda.id);
  if(index && index > 0){
    state.getTiendas[index] = action.tienda;
  }
  
  return ({
    ...state
  })
};

const loadingIni = (state = INITIAL_STATE) => ({
  ...state,
  loading: true
});

const loadingOff = (state = INITIAL_STATE) => ({
  ...state,
  loading: false
});

const HANDLERS = {
  [DELETE_TIENDA]: remove,
  [SAVE_TIENDA]: save,
  [GET_TIENDAS]: fetchData,
  [TIENDA_LOADING]: loadingIni,
  [TIENDA_LOADING_OFF]: loadingOff,
  [UPDATE_TIENDA]: update,
  
  [ReduxSauceTypes.DEFAULT]: state => state
}

export default createReducer(INITIAL_STATE, HANDLERS);