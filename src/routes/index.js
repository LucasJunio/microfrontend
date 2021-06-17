import React from 'react';
// import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux'


import store from '../store'
import Route from './Route'
import history from '../services/history';

import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Home from '../pages/Home';

export default function Routes() {

  return (
    <>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Home} isPrivate />

          {/* Pode-se usar o switch para um componente completamente montado */}
          {/* <Switch> */}
          {/* </Switch> */}

        </ConnectedRouter>
      </Provider>
    </>
  );
}
