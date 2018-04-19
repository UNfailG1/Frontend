import React, { Component } from 'react'
import { GET_AUTH } from '../js/requests'

class PlayerProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    const $ = window.$
    document.title = "SPairing"
    $(document).ready(function() {
      $('ul.tabs').tabs()
    })
  }

  componentWillMount() {
    // const game_id = this.props.game_id
    const route = "/player_profiles/".concat(localStorage.getItem('userId'))
    GET_AUTH(route).then(
      (res) => {
        this.setState({
          items: res.data,
          isLoaded: true
        })
      }
    )
  }

  render() {
    const { items, isLoaded } = this.state
    console.log(items)
    
    if (isLoaded) {
      const username = items.pp_username
      const email = items.email
      const elo = items.pp_spairing_elo
      const location = items.location.loc_name
      var friends = items.friends.map((item, i) => (<h5 className="leftText"  key={i}>{item.pp_username}</h5>))
      var games = items.games.map((item, i) => (<h5 className="leftText" key={i}>{item.gam_name}</h5>))
      return (
        <div>
          <div className="row">
            <div className="center-align">
              <i className="large material-icons">info_outline</i>
              <h3>{ username }</h3>
              <h5 className="secondary-color-text">{ email }</h5>
              <h4>Current player level (Rating): { elo }</h4>
              <h4>{ location }</h4>
            </div>
          </div>
          <div className="row center-align">
            <a href="/updateprofile" className="waves-effect waves-light btn primary-color">Edit Profile</a>
          </div>
          <div className="row">
            <div className="col s6">
              <h3 className="leftText">Friends</h3>
              <ul>{ friends }</ul>
            </div>
            <div className="col s6">
              <h3 className="leftText">Games</h3>
              <ul>{ games }</ul>
            </div>
          </div>
        </div>)
    } else {
      return (<h1>Loading...</h1>)
    }
  }
}

export default PlayerProfile