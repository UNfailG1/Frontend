import React, { Component } from 'react'
import { Link } from 'react-router-dom'

//Assets
import store from '../js/store'
import { logout } from '../js/actions'

const adjPadding = {
  'paddingLeft': '16px',
  'paddingRight': '16px'
}

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authed: store.getState().session
    }
  }

  initNav(){
    const $ = window.$
    $( document ).ready(function(){
      $(".button-collapse").sideNav()
    })
  }

  componentWillMount(){
    this.initNav()
    store.subscribe(
      () => {
        console.log(store.getState().session)
        this.setState({
          authed: store.getState().session
        })
      }
    )
  }

  log_out(event){
    event.preventDefault()
    localStorage.removeItem('spToken')
    localStorage.removeItem('userId')
    store.dispatch(logout())
  }

  render() {

    const authed = this.state.authed
    if(authed){
      return (
        <nav>
          <div className="nav-wrapper primary-color">
            <Link to="/" className="brand-logo" style={adjPadding}>SPairing</Link>
            <a href="#!" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/" onClick={ (e) => this.log_out(e) }>Log out</Link></li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/" onClick={ (e) => this.log_out(e) }>Log out</Link></li>
            </ul>
          </div>
        </nav>
      )
    }else{
      return (
        <nav>
          <div className="nav-wrapper primary-color">
            <Link to="/" className="brand-logo" style={adjPadding}>SPairing</Link>
            <a href="#!" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/register">Sign Up</Link></li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/register">Sign Up</Link></li>
            </ul>
          </div>
        </nav>
      )
    }
  }
}

export default Header