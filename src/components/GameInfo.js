import React, { Component } from 'react'

class GameInfo extends Component {

  componentDidMount(){
    const $ = window.$
    document.title = "SPairing";
    $(document).ready(function(){
      $('ul.tabs').tabs();
    })
  }

  render() {
    return (
        <div>
          <div className="row">
            <div className="center-align">
              <h1>Título del juego</h1>
              <i className="large material-icons">info_outline</i>
              <p> Esta es la descripción de un juego, en la que se muestra de lo que se trata.</p>
              <h7 className="secondary-color-text">Link donde se puede acceder a la página del juego</h7>
              <div className="row">
                <h7>Clasificación del juego: </h7>
                <h7>E+</h7>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default GameInfo
