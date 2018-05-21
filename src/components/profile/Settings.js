import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../../js/requests'

// Components
import Loading from '../helpers/Loading'
import UpdateProfile from './UpdateProfile'
import UpdatePassword from './UpdatePassword'
import ErrorManager from '../helpers/ErrorManager'
import LockedProfilesList from './LockedProfilesList'

class Settings extends Component {

  constructor(props){
    super(props)
    this.PROFILE = 0
    this.PASSWORD = 1
    this.LOCKED = 2
    this.state = {
      view: this.PROFILE,
      profile: {},
      isLoaded: null,
      status: null
    }
  }

  componentWillMount(){
    GET_AUTH(`/player_profiles/${localStorage.getItem('userId')}`).then(
      res => {
        this.setState({
          profile: res.data,
          isLoaded: true
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

  handleClick(event, view){
    event.preventDefault()
    this.setState({ view })
  }

  render(){

    const { view, profile, isLoaded } = this.state

    if(isLoaded){
      var content = null
      switch(view){

        case this.PROFILE:
          content = (<UpdateProfile username={ profile.pp_username }
            avatar={ profile.pp_avatar.url } location={ profile.location }
            email={ profile.email }/>)
          break

        case this.PASSWORD:
          content = (<UpdatePassword />)
          break

        case this.LOCKED:
          content = (<LockedProfilesList locked={ profile.locked_players } />)
          break

        default:
          content = (<div>Error</div>)
          break
      }

      return (
        <div className="container">
          <div className="row" style={{ marginTop: 32 }}>
            <div className="col s12 m3 l3">
              <div className="collection">
                <a href="#!" className="primary-color-text collection-item"
                  onClick={ (e) => this.handleClick(e, this.PROFILE) }>Profile</a>
                <a href="#!" className="primary-color-text collection-item"
                  onClick={ (e) => this.handleClick(e, this.PASSWORD) }>Password</a>
                <a href="#!" className="primary-color-text collection-item"
                  onClick={ (e) => this.handleClick(e, this.LOCKED) }>Locked Players</a>
              </div>
            </div>
            <div className="col s12 m9 l9">
              { content }
            </div>
          </div>
        </div>
      )
    }else if(isLoaded == null){
      return <Loading />
    }else{
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default Settings
