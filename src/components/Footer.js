import React, { Component } from 'react'

class Footer extends Component {

  render() {
    return (
      // <div>
        /*{ <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5>Desarrollado por:</h5>
              <p>UNfail</p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5>Links</h5>
              <ul>
                <li><a className="white-text" href="http://materializecss.com">Materialize</a></li>
                <li><a className="white-text" href="https://github.com/UNfailG1">Github</a></li>
                <li><a className="white-text" href="https://spairing.herokuapp.com">Heroku-Front</a></li>
                <li><a className="white-text" href="https://spairing-api.herokuapp.com">Heroku-Back</a></li>
              </ul>
            </div>
          </div>
        </div> }*/
        <div className="footer-copyright">
          <div className="container">
            2018 Copyright - SPairing
            <a className="white-text right" href="https://github.com/UNfailG1">Github</a>
            <a className="white-text right" href="https://spairing.herokuapp.com">Heroku-Front</a>
            <a className="white-text right" href="https://spairing-api.herokuapp.com">Heroku-Back</a>
          </div>
        </div>
      // {/* </div> */}
    )
  }
}

export default Footer
