import React, { Component } from 'react'

// Components
import GameSearch from './GameSearch'
import ProfileSearch from './ProfileSearch'

class Dashboard extends Component {

  constructor(props){
    super(props)
    this.HOME = 0
    this.PAIRING = 1
    this.GAMES = 2
    this.PROFILES = 3
    this.state = {
      view: this.HOME
    }

  }

  componentDidMount(){
    document.title = 'SPairing'
  }

  handleClick(event, i){
    event.preventDefault()
    this.setState({ view: i })
  }

  render(){
    const { view } = this.state
    var content = null
    const noMargin = { margin: 0 }
    switch(view){
      case this.HOME:
        content = (<div>Home</div>)
        break

      case this.PAIRING:
        content = (<div>Pairing</div>)
        break

      case this.GAMES:
        content = (<GameSearch />)
        break

      case this.PROFILES:
        content = (<ProfileSearch />)
        break

      default:
        content = (<div>Un error</div>)
        break
    }
    return (
      <div className="row fill-height" style={ noMargin }>
        <div className="col s12 m3 l2">
          <div className="collection">
            <a href="#!" className="primary-color-text collection-item"
              onClick={ (e) => this.handleClick(e, this.HOME) }>Home</a>
            <a href="#!" className="primary-color-text collection-item"
              onClick={ (e) => this.handleClick(e, this.PAIRING) }>Pairing</a>
            <a href="#!" className="primary-color-text collection-item"
              onClick={ (e) => this.handleClick(e, this.GAMES) }>Games</a>
            <a href="#!" className="primary-color-text collection-item"
              onClick={ (e) => this.handleClick(e, this.PROFILES) }>Players</a>
          </div>
        </div>
        <div className="col s12 m9 l10">
          { content }
        </div>
      </div>
    )
  }
}

export default Dashboard
