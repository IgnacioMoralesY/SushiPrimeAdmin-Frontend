import { DELETE_USER, SAVE_USER, GET_USERS , LOGIN_USER, USER_LOADING, USER_LOADING_OFF, LOGIN_USER_OUT, SET_PAYLOAD, UPDATE_USER, BLOQUEAR_USER, DESBLOQUEAR_USER } from '../actions/types';
import { createReducer, Types as ReduxSauceTypes } from 'reduxsauce';

const emptyUser = { 
  id: '',
  nombre: '', 
  apellido: '', 
  rut: '', 
  password: '', 
  rol: ''
};

const INITIAL_STATE  = {
	getUsers: [],
  newUser: emptyUser,
  payload: emptyUser,
  loading: false
}

const fetchData = (state = INITIAL_STATE, action) => ({
    ...state,
    getUsers: action.users
});

const remove = (state = INITIAL_STATE, action) => ({
    ...state,
    getUsers: state.getUsers.filter(post => post.id !== action.id )
});

const save = (state = INITIAL_STATE, action) => ({
    ...state,
    getUsers: state.getUsers.concat(action.newUser)
});

const update = (state = INITIAL_STATE, action) => {
  let index = state.getUsers.findIndex((user) => user.id === action.user.id);
  if(index && index > 0){
    state.getUsers[index] = action.user;
  }
  
  return ({
    ...state
  })
};

const setPayload= (state = INITIAL_STATE, action) => ({
  ...state,
  payload: action.payload,
});

const login = (state = INITIAL_STATE, action) => ({
  ...state,
  payload: action.payload.user
});

const logOut = (state = INITIAL_STATE) => ({
  ...state,
  payload: emptyUser
});

const loadingIni = (state = INITIAL_STATE) => ({
  ...state,
  loading: true
});

const loadingOff = (state = INITIAL_STATE) => ({
  ...state,
  loading: false
});

const bloquear = (state = INITIAL_STATE, action) => {
  let user = action.user;
  let listUsers = [...state.getUsers].map(us => {
    if(us.id === user.id){
      us.bloqueado = 1;
    }
    return us;
  })

  return ({
    ...state,
    getUsers: listUsers
  })
};

const desbloquear = (state = INITIAL_STATE, action) => {
  let user = action.user;
  let listUsers = [...state.getUsers].map(us => {
    if(us.id === user.id){
      us.bloqueado = 0;
    }
    return us;
  })

  return ({
    ...state,
    getUsers: listUsers
  })
};

const HANDLERS = {
  [GET_USERS]: fetchData,
  [SAVE_USER]: save,
  [DELETE_USER]: remove,
  [LOGIN_USER]: login,
  [USER_LOADING]: loadingIni,
  [USER_LOADING_OFF]: loadingOff,
  [LOGIN_USER_OUT]: logOut,
  [SET_PAYLOAD]: setPayload,
  [UPDATE_USER]: update,
  [BLOQUEAR_USER]: bloquear,
  [DESBLOQUEAR_USER]: desbloquear,

  [ReduxSauceTypes.DEFAULT]: state => state
}

export default createReducer(INITIAL_STATE, HANDLERS);