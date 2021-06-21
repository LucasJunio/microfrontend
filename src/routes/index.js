import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from '../pages/home'
import Login from '../pages/login'
import Signup from '../pages/signup'
import Products from '../pages/products'
import Email from '../pages/email'

import PrivateRoute from './privateroute'

const Routes =() => {
  return (
   <Router>
     <Switch>
     <Route exact path='/'><Signup/></Route>
     <Route path='/login'><Login/></Route>
     <Route path='/products'><Products/></Route>    
     <Route path='/email'><Email/></Route> 
     <PrivateRoute path='/home'><Home/></PrivateRoute>  
     </Switch>  
   </Router>
  );
} 

export default Routes;
