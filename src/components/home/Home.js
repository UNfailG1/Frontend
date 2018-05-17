import React, { Component } from 'react'

// Assets
import test from '../../assets/login_img.jpg'

// Components

class Home extends Component {

  render() {
    return (
      <div className="row">
        <div className="col s12 m6 l6 white l-panel" >
          <h3>Smart Pairing</h3>
          <p>Aqui va una corta descripcion de spairing</p>
        </div>
        <div className="col s12 m6 l6 white l-img" >
          <img src={test} height="450"/>
        </div>

        <div className="col s12 m6 l6 l-img" >Imagen</div>
        <div className="col s12 m6 l6 l-panel" >Caracteristica1</div>
        <div className="col s12 m6 l6 white l-panel" >Caracteristica2</div>
        <div className="col s12 m6 l6 white l-img" >Imagen</div>
        <div className="col s12 m6 l6 l-img" >Imagen</div>
        <div className="col s12 m6 l6 l-panel" >Caracteristica1</div>
        <div className="col s12 m6 l6 white l-panel" >Caracteristica2</div>
        <div className="col s12 m6 l6 white l-img" >Imagen</div>
      </div>
    )
  }
}

export default Home
