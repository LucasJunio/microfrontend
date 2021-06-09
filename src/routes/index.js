import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/login'
import Signup from '../pages/signup'

import PrivateRoute from './privateroute'

const Routes =() => {
  return (
   <Router>
     <Switch>
     <Route exact path='/'>
      <Signup/>
     </Route>
     <Route path='/login'>
      <Login/>
     </Route>  
     <PrivateRoute path='/home'>
      <Home/>
     </PrivateRoute>  
     </Switch>  
   </Router>
  );
} 

export default Routes;
