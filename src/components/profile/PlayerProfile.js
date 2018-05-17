import React, { Component } from 'react'

// Assets
import { BASE_URL } from '../../js/assets'
import { GET_AUTH } from '../../js/requests'
import defaultAvatar from '../../assets/user.svg'

// Components
import PGPList from './PGPList'
import FriendsList from './FriendsList'
import Loading from '../helpers/Loading'
import FriendAction from './FriendAction'
import ErrorManager from '../helpers/ErrorManager'

class PlayerProfile extends Component {

  constructor(props) {
    super(props)
    this.friendStatusLoaded = null
    this.profileLoaded = null
    this.friendsLists = null
    this.currentProfile = null
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
    this.updateView()
  }

  initTabs(){
    const $ = window.$
    $(document).ready(function() {
      $('ul.tabs').tabs()
    })
  }

  updateView(){
    const { match: { params } } = this.props
    if(this.state.isLoaded === true){
      if(this.currentProfile !== params.userId){
        this.setState({ isLoaded: null })
        this.currentProfile = params.userId
      }
    }else{
      const route = `/player_profiles/${params.userId}`
      GET_AUTH(route).then(
        res => {
          this.setState({
            profile: res.data,
            isLoaded: this.updateStatus(true, this.friendStatusLoaded, null)
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
      if(localStorage.getItem('userId') !== params.userId){
        GET_AUTH(`/friend_status/${params.userId}`).then(
          res => {
            this.updateStatus(this.profileLoaded, true, res.data)
            this.setState({
              isLoaded: this.profileLoaded && this.friendStatusLoaded
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
  }

  componentWillMount() {
    this.updateView()
  }

  updateStatus(profileLoaded, friendStatusLoaded, data){
    const { match: { params } } = this.props
    if(this.profileLoaded == null){
      this.profileLoaded = profileLoaded
    }

    if (this.friendStatusLoaded == null){
      this.friendStatusLoaded = friendStatusLoaded
    }

    if(this.friendsLists == null){
      this.friendsLists = data
    }
    return (localStorage.getItem('userId') !== params.userId) ?
      this.profileLoaded && this.friendStatusLoaded :
      this.profileLoaded
  }

  render() {
    const { profile, isLoaded } = this.state

    if (isLoaded) {
      const { match: { params } } = this.props
      const {
        email,
        games,
        friends,
        pp_avatar,
        pp_username,
        player_game_profiles
      } = profile
      const profileButton = (params.userId === localStorage.getItem('userId')) ?
        (<div className="center-align" style={{ marginBottom: 8 }}>
          <a className="waves-effect waves-light btn primary-color" href="/updateprofile"
            style={{ width: '100%' }}>
              Edit profile
          </a>
        </div>) :
        (<FriendAction friendId={ params.userId } lists={ this.friendsLists } />)

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
