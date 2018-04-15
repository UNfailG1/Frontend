import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

//Assets
import store from '../js/store'
import App from '../components/App'
import { ROUTES } from '../js/routes'

class RoutesList extends Component {

  constructor(props){
    super(props)
    this.state = {
      authed: store.getState().session
    }
  }

  componentWillMount(){
    store.subscribe(
      () => {
        this.setState({ authed: store.getState().session })
      }
    )
  }

  render(){
    const { authed } = this.state
    const routes = ROUTES.map(
      (route, index) => {
        if('path' in route){
          if('redirect' in route){
            switch (route.redirect.when) {
              case 'LOGED_IN':
              default:
                return (authed) ?
                  <Redirect key={ index } from={ route.path } to={ route.redirect.to } />  :
                  <Route key={ index } exact path={ route.path } component={ route.component }/>
              case 'VISITOR':
                return (!authed) ?
                  <Redirect key={ index } from={ route.path } to={ route.redirect.to } />  :
                  <Route key={ index } exact path={route.path} component={ route.component }/>
            }
          }else{
            return (<Route key={ index } exact path={route.path} component={ route.component }/>)
          }
        }else{
          return (<Route key={ index } component={ route.component }/>)
        }
      }
    )

    return (
      <App>
        <Switch>
          { routes }
        </Switch>
      </App>
    )
  }
}

export default RoutesList
