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
    return (
      <nav>
        <div className="nav-wrapper primary-color">
          <a href="#!" className="brand-logo" style={{'marginLeft': '16px'}}>SPairing</a>
          <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Sing In</Link></li>
            <li><Link to="/register">Sing Up</Link></li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Sing In</Link></li>
            <li><Link to="/register">Sing Up</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
