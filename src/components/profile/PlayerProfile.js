import React, { Component } from 'react'

// Assets
import { BASE_URL } from '../../js/assets'
import { GET_AUTH } from '../../js/requests'
import defaultAvatar from '../../assets/user.svg'

// Components
import PGPList from './PGPList'
import FriendsList from './FriendsList'
import Loading from '../helpers/Loading'
import ErrorManager from '../helpers/ErrorManager'

class PlayerProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      profile: {},
      isLoaded: null,
      avatar: null,
      status: null
    }
  }

  componentDidMount() {
    document.title = "SPairing"
    this.initTabs()
  }

  componentDidUpdate(){
    this.initTabs()
  }

  initTabs(){
    const $ = window.$
    $(document).ready(function() {
      $('ul.tabs').tabs()
    })
  }

  componentWillMount() {
    const { match: { params } } = this.props
    const route = `/player_profiles/${params.userId}`
    GET_AUTH(route).then(
      (res) => {
        console.log(res.data);
        this.setState({
          profile: res.data,
          isLoaded: true
        })
      }
    ).catch(
      (error) => {
        this.setState({
          isLoaded: false,
          status: (error.response) ? error.response.status : 0
        })
      }
    )
  }

  render() {
    const { profile, isLoaded } = this.state
    const {
      email,
      games,
      friends,
      pp_avatar,
      pp_username,
      player_game_profiles
    } = profile

    if (isLoaded) {
      return (
        <div className="container">
          <div className="row" style={{ marginTop: 32}}>
            <div className="col s12 m3 l3">
              <img src={ (pp_avatar.url) ? BASE_URL + pp_avatar.url : defaultAvatar }
                alt="Profile img" className="responsive-img circle"/>
              <p className="truncate" style={{ fontSize: 24, lineHeight: 1 }}>
                { pp_username }<br />
                <small className="grey-text trucate">{ email }</small>
              </p>
              <div style={{ height: 200 }} className="teal">Espacio para mapa</div>
            </div>
            <div className="col s12 m9 l9">
              <ul className="tabs" style={{ margin: 0 }}>
                <li className="tab"><a className="primary-color-text" href="#pgp">Games</a></li>
                <li className="tab"><a className="primary-color-text" href="#friends">Friends</a></li>
              </ul>
              <div id="pgp">
                <PGPList games={ games } pgps={ player_game_profiles }/>
              </div>
              <div id="friends">
                <FriendsList friends={ friends } />
              </div>
            </div>
          </div>
        </div>
      )
    } else if(isLoaded == null) {
      return (<Loading />)
    } else {
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default PlayerProfile
