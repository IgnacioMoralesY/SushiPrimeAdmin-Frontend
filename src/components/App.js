import React from 'react';
import { Provider } from 'react-redux';
import reducer from '../reducers'
import { createStore , applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../pages/Home';
import HistoricoPage from '../pages/Historico';
import LoginPage from '../pages/Login';
import NotFoundPage from '../pages/NotFound';
import Usuarios from '../pages/Usuarios';
import Tiendas from '../pages/Tiendas';
import UsuariosEnrrolados from '../pages/UsuariosEnrrolados';

import Menu from './Menu';

import { makeStyles, useTheme } from '@material-ui/core/styles';


const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Provider store={store}>

      <Router>
        <div className={classes.root}>
            <Menu />

            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                  <Route exact path="/">
                    <HomePage type="0" />
                  </Route>
                  <Route exact path="/home">
                    <HomePage />
                  </Route>
                  <Route exact path="/asistencia-historica">
                    <HistoricoPage />
                  </Route>
                  <Route exact path="/login">
                    <LoginPage />
                  </Route>
                  <Route exact path="/usuarios">
                    <Usuarios />
                  </Route>
                  <Route exact path="/usuarios-enrrolados">
                    <UsuariosEnrrolados />
                  </Route>

                  <Route exact path="/tiendas">
                    <Tiendas />
                  </Route>
                  <Route>
                    <NotFoundPage />
                  </Route>
                </Switch>
            </main>
        </div>

      </Router>
    </Provider>
  );
}

export default App;
