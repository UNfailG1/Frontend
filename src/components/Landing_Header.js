import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize'
import '../styles/Landing.css';

class Landing_Header extends Component {
    
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