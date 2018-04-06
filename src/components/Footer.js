import React, { Component } from 'react'

class Footer extends Component {

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Desarrollado por:</h5>
              <p className="grey-text text-lighten-4">UNfail</p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Links</h5>
              <ul>
                <li><a className="grey-text text-lighten-3" href="http://materializecss.com">Materialize</a></li>
                <li><a className="grey-text text-lighten-3" href="https://github.com/UNfailG1">Github</a></li>
                <li><a className="grey-text text-lighten-3" href="https://spairing.herokuapp.com">Heroku-Front</a></li>
                <li><a className="grey-text text-lighten-3" href="https://spairing-api.herokuapp.com">Heroku-Back</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            2018 Copyright - SPairing
          <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
