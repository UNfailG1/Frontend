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
          
          <div>
            <h3>Top Rated Players</h3>
            <ul class="collection">
              <li class="collection-item avatar">
                <span class="title">Nickname Jugador</span>
                <p>Calificación: <br/>
                   Reputación:
                </p>
                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
              </li>
              <li class="collection-item avatar">
                <i class="material-icons circle">account_circle</i>
                <span class="title">Nickname Jugador</span>
                <p>Calificación: <br/>
                   Reputación:
                </p>
                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
              </li>
              <li class="collection-item avatar">
                <i class="material-icons circle green">account_circle</i>
                <span class="title">Nickname Jugador</span>
                <p>Calificación: <br/>
                   Reputación:
                </p>
                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
              </li>
              <li class="collection-item avatar">
                <i class="material-icons circle red">account_circle</i>
                <span class="title">Nickname Jugador</span>
                <p>Calificación: <br/>
                   Reputación:
                </p>
                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
              </li>
            </ul>
          </div>
        </div>
    )
  }
}

export default GameInfo
