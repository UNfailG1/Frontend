import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize'
import '../styles/App.css';

class Header extends Component {
    
    render() {
    return (
        
        <div className="">
            <Navbar className="Navbar" brand='SPairing Logo' right>
              <NavItem href='components.html'>Iniciar Sesión</NavItem>
            </Navbar>
        </div>
    )
    }
}

export default Header