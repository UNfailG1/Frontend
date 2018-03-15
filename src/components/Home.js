import React, { Component } from 'react'
import lol1 from '../assets/lol1.png';
import halo1 from '../assets/haloReach1.jpg';
import fort1 from '../assets/fortnite1.jpg';
import mine1 from '../assets/minecraft1.jpeg';

class Home extends Component {

    render() {
    return (
        <div>
          <div class="row">
            <div class="col s12">
              <ul class="tabs">
                <li class="tab col s3"><a href="#test1">League of Legends</a></li>
                <li class="tab col s3"><a href="#test2">Halo Reach</a></li>
                <li class="tab col s3 disabled"><a href="#test3">Minecraft</a></li>
                <li class="tab col s3"><a href="#test4">Fortnite</a></li>
              </ul>
            </div>
            <div id="test1" class="col s12">
              <div class="row">
                <div class="col s12 m7">
                  <div class="card">
                    <div class="card-image">
                      <img src={lol1}>
                      <span class="card-title">League of Legends</span>
                    </div>
                    <div class="card-content">
                      <p>Información acerca de lo mas reciente de LoL</p>
                    </div>
                    <div class="card-action">
                      <a href="#!">Ir a Foro?</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="test2" class="col s12">
              <div class="row">
                <div class="col s12 m7">
                  <div class="card">
                    <div class="card-image">
                      <img src={halo1}>
                      <span class="card-title">Halo Reach</span>
                    </div>
                    <div class="card-content">
                      <p>Información acerca de lo mas reciente de Halo Reach</p>
                    </div>
                    <div class="card-action">
                      <a href="#!">Ir a Foro?</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="test3" class="col s12">
              <div class="row">
                <div class="col s12 m7">
                  <div class="card">
                    <div class="card-image">
                      <img src={mine1}>
                      <span class="card-title">Minecraft</span>
                    </div>
                    <div class="card-content">
                      <p>Información acerca de lo mas reciente de Minecraft</p>
                    </div>
                    <div class="card-action">
                      <a href="#!">Ir a Foro?</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="test4" class="col s12">
              <div class="row">
                <div class="col s12 m7">
                  <div class="card">
                    <div class="card-image">
                      <img src={fort1}>
                      <span class="card-title">Fornite</span>
                    </div>
                    <div class="card-content">
                      <p>Información acerca de lo mas reciente de Fornite</p>
                    </div>
                    <div class="card-action">
                      <a href="#!">Ir a Foro?</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col s4 center-align">
              <i class="large material-icons">info_outline</i>
              <p> Texto de explicación de caracteristica 1</p>
            </div>
            <div class="col s4 center-align">
              <i class="large material-icons">info_outline</i>
              <p> Texto de explicación de caracteristica 2</p>
            </div>
            <div class="col s4 center-align">
              <i class="large material-icons">info_outline</i>
              <p> Texto de explicación de caracteristica 3. Uso de diferentes modalidades de juego y facilidad para comunicarse con su equipo</p>
            </div>
          </div>
        </div>
    )
  }
}

export default Home
