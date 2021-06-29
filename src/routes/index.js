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
import Email from '../pages/Email';
import Products from '../pages/Products';
import Form from '../pages/Form';
import Form1 from '../pages/Form1';

export default function Routes() {
  return (
    <>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {/* <Route path="/" exact component={Home} isPrivate /> */}
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/email" exact component={Email} />
          <Route path="/products" exact component={Products} />
          <Route path="/form" exact component={Form} />
          <Route path="/form1" exact component={Form1} />
          {/* Pode-se usar o switch para um componente completamente montado */}
          {/* <Switch> */}
          {/* </Switch> */}
        </ConnectedRouter>
      </Provider>
    </>
  );
}
