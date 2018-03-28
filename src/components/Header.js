import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  initNav(){
    const $ = window.$
    $( document ).ready(function(){
      $(".button-collapse").sideNav()
    })
  }

  componentWillMount(){
    this.initNav()
  }

  render() {
    const adjPadding = {
      'paddingLeft': '16px',
      'paddingRight': '16px'
    }
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

export default Header
