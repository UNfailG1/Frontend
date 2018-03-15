import React from 'react'
import { Route, Switch } from 'react-router-dom'

import App from '../components/App'
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import Home from '../components/Home'
import NotFound from '../components/NotFound'

const Routes = () => (
  <App>
    <Switch>
      <Route exact path="/" component={ Home }/>
      <Route exact path="/login" component={ SignIn }/>
      <Route exact path="/register" component={ SignUp }/>
      <Route component={NotFound}/>
    </Switch>
  </App>
)

export default Routes
