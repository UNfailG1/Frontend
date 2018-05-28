import React, { Component } from 'react'

// Components
import Home from './Home'
import Pairing from './Pairing'
import GameSearch from './GameSearch'
import ProfileSearch from './ProfileSearch'
import AdList from '../ads/AdList'

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
        content = (<Home />)
        break

      case this.PAIRING:
        content = (<Pairing />)
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
      <main style={{ height: 'auto' }}>
        <div className="row" style={ noMargin }>
          <div className="col s12 m3 l2">
            <div className="collection">
              <a href="#!" className="primary-color-text collection-item"
                onClick={ (e) => this.handleClick(e, this.HOME) }>Home</a>
              <a href="#!" className="primary-color-text collection-item"
                onClick={ (e) => this.handleClick(e, this.PAIRING) }>Pairing</a>
              <a href="#!" className="primary-color-text collection-item"
                onClick={ (e) => this.handleClick(e, this.GAMES) }>Game</a>
              <a href="#!" className="primary-color-text collection-item"
                onClick={ (e) => this.handleClick(e, this.PROFILES) }>Players</a>
            </div>
            <div className="center-align">
              <h5>Sponsored Content</h5>
            </div>
            <AdList/>
          </div>
          <div className="col s12 m9 l10">
            { content }
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard
