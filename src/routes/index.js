import React from 'react';
// import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux'

import store from '../store'
import Route from './Route'
import history from '../services/history';

import Signup from '../pages/Signup';
import Home from '../pages/Home';
import Email from '../pages/Email';

export default function Routes() {
  return (
    <>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Home} />
          {/* <Route path="/" exact component={Home} isPrivate /> */}
          <Route path="/signup" exact component={Signup} />
          <Route path="/email" exact component={Email} />
          {/* Pode-se usar o switch para um componente completamente montado */}
          {/* <Switch> */}
          {/* </Switch> */}
        </ConnectedRouter>
      </Provider>
    </>
  );
}
