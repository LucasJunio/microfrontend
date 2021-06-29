import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import "assets/scss/material-kit-react.scss?v=1.10.0";

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);