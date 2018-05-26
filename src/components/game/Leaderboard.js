import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../../js/requests'
import defaultAvatar from '../../assets/user.svg'

class Leaderboard extends Component {

  constructor(props){
    super(props)
    this.game = this.props.game
    this.state = {
      player_game_profiles: []
    }
  }

  componentDidMount(){

    GET_AUTH(`/game_best_players/${this.game.id}?page=1`).then(
      (res) => {
        console.log(res.data);
        this.setState({
          player_game_profiles: res.data
        })
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )

  }

  render(){
    const { gam_name } = this.game
    const { player_game_profiles } = this.state

    var bestPlayers = player_game_profiles.map(
      (player) => (
          <li key={ player.id } className="collection-item avatar valign-wrapper">
            <div className="col s3">
              <img src={ (player.player_profile.pp_avatar.url) ? player.player_profile.pp_avatar.url : defaultAvatar }
                alt={ player.player_profile.pp_username } className="responsive-img" />
            </div>
            <div className="col s6">
              <span className="title">{ player.pgp_nickname }</span>
            </div>
            <div className="col s3">
              <span className="title">{ player.pgp_reputation }</span>
            </div>
          </li>
      )
    )
    return(
      <div>
        <h3>Best Players { gam_name }</h3>
        <ul className="collection">{bestPlayers}</ul>
      </div>
    )
  }
}

export default Leaderboard
