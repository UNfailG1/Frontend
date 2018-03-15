import React from 'react'
import { Route, Switch } from 'react-router-dom'

import App from '../components/App'
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import Home from '../components/Home'

const Routes = () => (
  <App>
    <Switch>
      <Route path="/" component={ Home }/>
      <Route path="/login" component={ SignIn }/>
      <Route path="/register" component={ SignUp }/>
      <Route render={ () => (<h1>404 Not Found</h1>) }/>
    </Switch>
  </App>
)

export default Routes
