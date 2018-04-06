import React from 'react'
import { Route, Switch,
  BrowserRouter as Router,
  Link,
  Redirect,
  withRouter } from 'react-router-dom'

import App from '../components/App'
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import Home from '../components/Home'
import NotFound from '../components/NotFound'
import ResetPassword from '../components/ResetPassword'
import GameInfo from '../components/GameInfo'
import ForumList from '../components/ForumList'
import Platform from '../components/Platform'

var authed = false

const Routes = () => (

  <Router>
    <App>
      <Route exact path="/" component={ Home }/>
      <Route exact path="/login" component={ SignIn }/>
      <Route exact path="/register" component={ SignUp }/>
      <Route exact path="/resetpassword" component={ ResetPassword }/>
      <Route exact path="/gameinfo" component={ GameInfo }/>
      <PrivateRoute authed={this.authed} path='/forums' component={ ForumList } />
      <Route component={NotFound}/>
    </App>
  </Router>

)

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to='/login'/>}
    />
  )

export default Routes
