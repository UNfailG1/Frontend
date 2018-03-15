import React, { Component } from 'react'
import { Row, Col, /*Input, Button,*/ Navbar, NavItem, Card, CardTitle, Tabs, Tab, /*MediaBox,*/ Icon, Footer} from 'react-materialize'
import '../styles/Landing.css';
import lol1 from '../assets/lol1.png';
import halo1 from '../assets/haloReach1.jpg';
import fort1 from '../assets/fortnite1.jpg';
import mine1 from '../assets/minecraft1.jpeg';
/*import info1 from '../assets/info1.png';
import info2 from '../assets/info2.png';
import info3 from '../assets/info3.png';*/

class App extends Component {
  /*constructor(props){
    super(props)
    
  }*/
  

  render() {
    return (
      <div className="">
        <Navbar className="Navbar" brand='SPairing Logo' right>
          <NavItem href='components.html'>Iniciar Sesión</NavItem>
        </Navbar>
        <Row className='News-tab'>
          <Col offset="s1" className="center-align">
            <Tabs>
              <Tab title="League of Legends" active>
                <Card header={<CardTitle reveal image={lol1} waves='light'/>}
                  title="League of Legends"
                  reveal={<p>Información acerca de lo mas reciente de LoL</p>}>
                  <p><a href="#!">Ir a Foro?</a></p>
                </Card>
              </Tab>
              <Tab title="Halo Reach">
                <Card header={<CardTitle reveal image={halo1} waves='light'/>}
                  title="Halo Reach"
                  reveal={<p>Información acerca de lo mas reciente de Halo Reach</p>}>
                  <p><a href="#!">Ir a Foro?</a></p>
                </Card>
              </Tab>
              <Tab title="Minecraft">
                <Card header={<CardTitle reveal image={mine1} waves='light'/>}
                  title="Minecraft"
                  reveal={<p>Información acerca de lo mas reciente de Minecraft</p>}>
                  <p><a href="#!">Ir a Foro?</a></p>
                </Card>
              </Tab>
              <Tab title="Fortnite">
                <Card header={<CardTitle reveal image={fort1} waves='light'/>}
                  title="Fortnite"
                  reveal={<p>Información acerca de lo mas reciente de Fortnite</p>}>
                  <p><a href="#!">Ir a Foro?</a></p>
                </Card>
              </Tab>
          </Tabs>
            
          </Col>
        </Row>
        <Row>
          <Col m={4} s={4} className="center-align">
            {/*<MediaBox src="./img/sample-1.jpg" caption="A demo media box1" width="500"/>*/}
            <Icon large>info_outline</Icon>
            <p> Texto de explicación de caracteristica 1</p>
          </Col>
          <Col m={4} s={4} className="center-align">
            <Icon large>info_outline</Icon>
            <p> Texto de explicación de caracteristica 2</p>
          </Col>
          <Col m={4} s={4} className="center-align">
            <Icon large>info_outline</Icon>
            <p> Texto de explicación de caracteristica 3. Uso de diferentes modalidades de juego y facilidad para comunicarse con su equipo</p>
          </Col>
        </Row>
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

export default App