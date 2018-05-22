import React, { Component } from 'react'

// Assets
import { BASE_URL } from '../../js/assets'
import defaultAvatar from '../../assets/user.svg'

// Components
import PGPList from './PGPList'
import FriendsList from './FriendsList'
import PlayerAction from './PlayerAction'


class PlayerProfile extends Component {

  componentDidMount() {
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

  get_data = (data) => {
    this.rLoaded = true
    this.relationsLists = data
    const cl = this.checkLocks()
    this.setState({ locked: cl })
  }

  render() {
    const { isLoaded, locked } = this.state
    const { profile, own, relationsLists } = this.props
    const {
      email,
      games,
      friends,
      pp_avatar,
      pp_username,
      player_game_profiles
    } = profile
    var profileButton = null
    if(own){
      profileButton = (
        <a className="waves-effect waves-light btn primary-color" href="/settings"
          style={{ width: '100%', marginBottom: 8 }}>
            Edit profile
        </a>
      )
    }else{
      const { current: { c_friends }, player: { p_friends } } = relationsLists
      profileButton = (
        <PlayerAction player_id={ profile.id } return_data={ this.get_data }
          lists={{ current_friends: c_friends, player_friends: p_friends }} />
      )
    }
    console.log(profile);

      return (locked && !own) ?
        (<main style={ fixHeight }>
          <h4 className="center-align">This content isn't available by locks</h4>
        </main>) :
        (<main style={ fixHeight }>
          <div className="container">
            <div className="row" style={{ marginTop: 32}}>
              <div className="col s12 m3 l3">
                <img src={ (pp_avatar.url) ? BASE_URL + pp_avatar.url : defaultAvatar }
                  alt="Profile img" className="responsive-img"/>
                <p className="truncate" style={{ fontSize: 24, lineHeight: 1 }}>
                  { pp_username }<br />
                  <small className="grey-text trucate">{ email }</small>
                </p>
                { profileButton }
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
        </main>
      )
  }
}

export default PlayerProfile
