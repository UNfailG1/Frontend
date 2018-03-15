import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize'
import { Link } from 'react-router-dom'

class Header extends Component {
  initNav(){
    const $ = window.$
    $( document ).ready(
      $(".button-collapse").sideNav()
    )
  }

  componentWillMount(){
    initNav()
  }

  render() {
    return (
      <nav>
        <div class="nav-wrapper primary-color">
          <a href="#" class="brand-logo right">SPairing</a>
          <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
          <ul id="nav-mobile" class="left hide-on-med-and-down">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Sing In</Link></li>
            <li><Link to="/register">Sing In</Link></li>
          </ul>
          <ul class="side-nav" id="mobile-demo">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Sing In</Link></li>
            <li><Link to="/register">Sing In</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
