import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from '../pages/home'
import Login from '../pages/login'

const Routes =() => {
  return (
   <Router>
     <Switch>
     <Route exact path='/'>
      <Home/>
     </Route>
     <Route path='/login'>
      <Login/>
     </Route>  
     </Switch>  
   </Router>
  );
}

export default Routes;
