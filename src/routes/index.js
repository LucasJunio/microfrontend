import React from 'react';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux'

import store from '../store'
import Route from './Route'
import history from '../services/history';

import Signup from '../pages/Signup';
import Home from '../pages/Home';
import Email from '../pages/email';

export default function Routes() {
  return (
    <>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/"  component={Home} isPrivate />
            <Route exact path="/signup"  component={Signup} />
            <Route exact path="/email*"  component={Email} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    </>
  );
}
