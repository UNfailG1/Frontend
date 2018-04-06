import React, { Component } from 'react'
import lol1 from '../assets/lol1.png';
import halo1 from '../assets/haloReach1.jpg';
import fort1 from '../assets/fortnite1.jpg';
import mine1 from '../assets/minecraft1.jpeg';
import { Link } from 'react-router-dom'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authed: false
    }
  }
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
            <div className="col s12 no-padding">
              <ul className="tabs ">
                <li className="tab col s3 "><a className="light-primary-color" href="#test1">League of Legends</a></li>
                <li className="tab col s3"><a className="light-primary-color" href="#test2">Halo Reach</a></li>
                <li className="tab col s3"><a className="light-primary-color" href="#test3">Minecraft</a></li>
                <li className="tab col s3"><a className="light-primary-color" href="#test4">Fortnite</a></li>
              </ul>
            </div>
            <div id="test1" className="col s12">
              <div className="row">
                <div className="col s12 m8 offset-m2">
                  <div className="card">
                    <div className="card-image">
                      <img alt="" src={lol1}/>
                      <span className="card-title">League of Legends</span>
                    </div>
                    <div className="card-content">
                      <p>Información acerca de lo mas reciente de LoL</p>
                    </div>
                    <div className="card-action">
                      <Link to="/forums">IR A FORO</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="test2" className="col s12">
              <div className="row">
                <div className="col s12 m8 offset-m2">
                  <div className="card">
                    <div className="card-image">
                      <img alt="" src={halo1}/>
                      <span className="card-title">Halo Reach</span>
                    </div>
                    <div className="card-content">
                      <p>Información acerca de lo mas reciente de Halo Reach</p>
                    </div>
                    <div className="card-action">
                      <Link to="/forums">IR A FORO</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="test3" className="col s12">
              <div className="row">
                <div className="col s12 m8 offset-m2">
                  <div className="card">
                    <div className="card-image">
                      <img alt="" src={mine1}/>
                      <span className="card-title">Minecraft</span>
                    </div>
                    <div className="card-content">
                      <p>Información acerca de lo mas reciente de Minecraft</p>
                    </div>
                    <div className="card-action">
                      <Link to="/forums">IR A FORO</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="test4" className="col s12">
              <div className="row">
                <div className="col s12 m8 offset-m2">
                  <div className="card">
                    <div className="card-image">
                      <img alt="" src={fort1}/>
                      <span className="card-title">Fornite</span>
                    </div>
                    <div className="card-content">
                      <p>Información acerca de lo mas reciente de Fornite</p>
                    </div>
                    <div className="card-action">
                      <Link to="/forums">IR A FORO</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s4 center-align">
              <i className="large material-icons">info_outline</i>
              <p> Texto de explicación de caracteristica 1</p>
            </div>
            <div className="col s4 center-align">
              <i className="large material-icons">info_outline</i>
              <p> Texto de explicación de caracteristica 2</p>
            </div>
            <div className="col s4 center-align">
              <i className="large material-icons">info_outline</i>
              <p> Texto de explicación de caracteristica 3. Uso de diferentes modalidades de juego y facilidad para comunicarse con su equipo</p>
            </div>
          </div>
        </div>
    )
  }
}

export default Home
