import React, { Component } from 'react'

// Components
import GameSearch from './GameSearch'

class Dashboard extends Component {

  constructor(props){
    super(props)
    this.HOME = 0
    this.PAIRING = 1
    this.GAMES = 2
    this.state = {
      view: this.HOME
    }

  }

  componentWillMount(){

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
    var content
    switch(view){
      case this.HOME:
        content = (<div>Home</div>)
      break

      case this.PAIRING:
        content = (<div>PAIRING</div>)
      break

      case this.GAMES:
        content = (<GameSearch />)
      break

      default:
        content = (<div>Un error</div>)
    }
    return (
      <div className="row" style={{margin: 0, 'height': '-webkit-fill-available'}}>
        <div className="col s12 m3 l2">
          <div className="collection">
            <a href="#!" className="primary-color-text collection-item"
              onClick={ (e) => this.handleClick(e, this.HOME) }>Home</a>
            <a href="#!" className="primary-color-text collection-item"
              onClick={ (e) => this.handleClick(e, this.PAIRING) }>Pairing</a>
            <a href="#!" className="primary-color-text collection-item"
              onClick={ (e) => this.handleClick(e, this.GAMES) }>Game</a>
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
