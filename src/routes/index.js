import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/login'
import Sigup from '../pages/signup'


const Routes =() => {
  return (
   <Router>
     <Switch>
     <Route exact path='/'>
      <Sigup/>
     </Route>
     <Route path='/login'>
      <Login/>
     </Route>  
     <Route path='/home'>
      <Home/>
     </Route>  
     </Switch>  
   </Router>
  );
}

export default Routes;
