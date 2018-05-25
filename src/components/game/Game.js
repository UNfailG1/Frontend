import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../../js/requests'

// Components
import GameGallery from './GameGallery'
import ForumTab from '../forum/ForumTab'
import Loading from '../helpers/Loading'
import GameDescription from './GameDescription'
import ErrorManager from '../helpers/ErrorManager'

class Game extends Component {

  constructor(props) {
    super(props)
    this.state = {
      game: {},
      isLoaded: null,
      status: null
    }
  }

  componentDidMount() {
    const { match: { params } } = this.props
    GET_AUTH(`/games/${ params.gameId }`).then(
      (res) => {
        this.setState({
          game: res.data,
          isLoaded: true
        })
      }
    ).catch(
      (error) => {
        console.log(error)
        this.setState({
          isLoaded: false,
          status: (error.response) ? error.response.status : 0
        })
      }
    )
    const $ = window.$
    document.title = "SPairing"
    $(document).ready(function(){
      $('.parallax').parallax()
      $('ul.tabs').tabs();
    })
  }

  componentDidUpdate() {
    const $ = window.$
    $(document).ready(function(){
      $('.parallax').parallax()
      $('ul.tabs').tabs();
    })
}

  render() {
    const { game, isLoaded } = this.state
    const noPadding = { padding: 0 }, noMargin = { margin: 0 }

    if (isLoaded) {
      const { gam_name, screenshots } = game
      const screenshot = screenshots[Math.floor(Math.random() * screenshots.length)].scr_url
      const fixHeight = { height: 'auto', minHeihgt: 'calc(100% - 110px)' }
      return (
        <main style={ fixHeight }>
          <div className="parallax-container">
            <h2 className="white-text container">
              { game.gam_name }
            </h2>
            <div className="parallax">
              <img src={ screenshot } alt={ gam_name }/>
            </div>
          </div>
          <div className="section" style={ noPadding }>

            <div className="row" style={ noMargin }>
              <div className="col s12" style={ noPadding }>
                <ul className="tabs">
                  <li className="tab col s4"><a className="primary-color-dark" href="#about">About</a></li>
                  <li className="tab col s4"><a className="primary-color-dark" href="#forum">Forum</a></li>
                  <li className="tab col s4"><a className="primary-color-dark" href="#statistics">Statistics</a></li>
                </ul>
              </div>
              <div className="container">
                <div id="about" className="col s12">
                  <GameDescription game={ game } />
                  <GameGallery screenshots={ screenshots } />
                </div>
                <div id="forum" className="col s12">
                  <ForumTab gameId={ game.id } />
                </div>
                <div id="statistics" className="col s12">
                  Statistics
                </div>
              </div>
            </div>
          </div>
        </main>
      )
    } else if(isLoaded == null) {
      return (<Loading />)
    } else {
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default Game
