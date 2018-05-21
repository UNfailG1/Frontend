import React, { Component } from 'react'

// Assets
import { BASE_URL } from '../../js/assets'
import { GET_AUTH } from '../../js/requests'
import defaultAvatar from '../../assets/user.svg'

// Components
import PGPList from './PGPList'
import FriendsList from './FriendsList'
import Loading from '../helpers/Loading'
import PlayerAction from './PlayerAction'
import ErrorManager from '../helpers/ErrorManager'

class PlayerProfile extends Component {

  constructor(props) {
    super(props)
    this.pLoaded = false
    this.rLoaded = false
    this.relationsLists = null
    this.curProfile = props.match.params.userId
    this.state = {
      profile: {},
      locked: null,
      isLoaded: null,
      avatar: null,
      status: null
    }
  }

  componentDidMount() {
    document.title = "SPairing"
    this.initTabs()
    this.requests()
  }

  componentDidUpdate(){
    this.initTabs()

    const { match: { params: { userId } } } = this.props
    if(userId !== this.curProfile){
      this.rLoaded = false
      this.relationsLists = null
      this.setState({
        isLoaded: null,
        locked: null
      })
      this.curProfile = userId
    }

    if(this.state.isLoaded === null){
      this.requests()
    }
  }

  initTabs(){
    const $ = window.$
    $(document).ready(function() {
      $('ul.tabs').tabs()
    })
  }

  requests(){
    const { match: { params: { userId } } } = this.props
    const route = `/player_profiles/${userId}`
    const own = localStorage.getItem('userId') === userId
    var cl = null
    GET_AUTH(route).then(
      res => {
        this.pLoaded = true
        this.setState({
          profile: res.data,
          isLoaded: (own) ? this.pLoaded : this.pLoaded && this.rLoaded
        })
      }
    ).catch(
      error => {
        this.setState({
          isLoaded: false,
          status: (error.response) ? error.response.status : 0
        })
      }
    )
    if(own){
      this.rLoaded = false
      this.relationsLists = null
    }else{

      GET_AUTH(`/relation_status/${userId}`).then(
        (res) => {
          this.rLoaded = true
          this.relationsLists = res.data
          cl = this.checkLocks()
          this.setState({
            isLoaded: this.pLoaded && this.rLoaded,
            locked: cl
          })
        }
      ).catch(
        error => {
          this.setState({
            isLoaded: false,
            status: (error.response) ? error.response.status : 0
          })
        }
      )
    }
  }

  get_data = (data) => {
    this.rLoaded = true
    this.relationsLists = data
    const cl = this.checkLocks()
    this.setState({ locked: cl })
  }

  checkLocks(){
    const { match: { params: { userId } } } = this.props
    const ownId = localStorage.getItem('userId')
    if(this.rLoaded){
      const { current: { c_locks }, player: { p_locks } } = this.relationsLists
      return p_locks.includes(parseInt(ownId,10)) || c_locks.includes(parseInt(userId,10))
    }
    return false
  }

  render() {
    const { profile, isLoaded, locked } = this.state
    const { match: { params: { userId } } } = this.props
    const own = userId === localStorage.getItem('userId')
    if (isLoaded && (this.rLoaded || own)) {
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
        const { current: { c_friends }, player: { p_friends } } = this.relationsLists
        profileButton = (
          <PlayerAction player_id={ userId } return_data={ this.get_data }
            lists={{ current_friends: c_friends, player_friends: p_friends }} />
        )
      }

      return (locked && !own) ?
        (<h4 className="center-align">This content isn't available by locks</h4>) :
        (<div className="container">
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
      )
    } else if(isLoaded == null) {
      return (<Loading />)
    } else {
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default PlayerProfile
