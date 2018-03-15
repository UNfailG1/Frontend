import React, { Component } from 'react'
import { Row, Footer } from 'react-materialize'
import '../styles/Landing.css';

class Footer extends Component {
    
    render() {
    return (
        
        <div className="">
            <Footer copyrights="2018 Copyright - SPairing"
              moreLinks={
                <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
              }
              links={
                <ul>
                  <li><a className="grey-text text-lighten-3" href="https://react-materialize.github.io">React Materialize</a></li>
                  <li><a className="grey-text text-lighten-3" href="https://github.com/UNfailG1">Github</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">Link Heroku</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
                </ul>
              }
              className='Footer'
            >
                <h5 className="white-text">Pie de Página</h5>
                <Row>Desarrollado por:</Row>
                <Row>UNfail</Row>
            </Footer>
        </div>
    )
    }
}

export default Footer