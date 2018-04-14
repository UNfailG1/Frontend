import React from 'react'
import { Route, Switch } from 'react-router-dom'

import App from '../components/App'
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import Home from '../components/Home'
import NotFound from '../components/NotFound'
import ResetPassword from '../components/ResetPassword'
import GameInfo from '../components/GameInfo'
import ForumList from '../components/ForumList'
import Platform from '../components/Platform'


const Routes = () => (

  <App>
    <Switch>
      <Route exact path="/" component={ Home }/>
      <Route exact path="/login" component={ SignIn }/>
      <Route exact path="/register" component={ SignUp }/>
      <Route exact path="/resetpassword" component={ ResetPassword }/>
      <Route exact path="/gameinfo" component={ GameInfo }/>
      <Route exact path="/forums" component={ ForumList }/>
      <Route exact path="/platforms" component={ Platform }/>
      <Route component={ NotFound }/>
    </Switch>
  </App>
)

export default Routes
