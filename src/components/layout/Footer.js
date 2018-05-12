import React, { Component } from 'react'

class Footer extends Component {

  render() {
    return (
      <div className="footer-copyright">
        <div className="container">
          2018 Copyright - SPairing
          <a className="white-text right" href="https://github.com/UNfailG1">Github</a>
          <a className="white-text right" href="https://spairing.herokuapp.com">Heroku-Front</a>
          <a className="white-text right" href="https://spairing-api.herokuapp.com">Heroku-Back</a>
        </div>
      </div>
    )
  }
}

export default Footer
