import React, { Component } from 'react'
import { Row, Col, Card, CardTitle, Tabs, Tab, Icon } from 'react-materialize'
import '../styles/Landing.css';
import lol1 from '../assets/lol1.png';
import halo1 from '../assets/haloReach1.jpg';
import fort1 from '../assets/fortnite1.jpg';
import mine1 from '../assets/minecraft1.jpeg';

class Landing_Body extends Component {

    render() {
    return (
        <div>
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
        </div>
    )
    }
}