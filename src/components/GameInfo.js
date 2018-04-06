import React, { Component } from 'react'
import $ from 'jquery'

class GameInfo extends Component {

  constructor(props){
        super(props)
        this.state = {
            items: [],
            isLoaded: false,
            error: null
        }
    }

    request(url){
        let token = "Bearer " + localStorage.getItem("jwt")
        //console.log(token)
        $.ajax({
          url: url,
          type: "GET",
          beforeSend: function(xhr){xhr.setRequestHeader('Authorization', token)},
          context: this, // Allows us to use this.setState inside success
          success: (result) => {
            console.log(result)
            this.setState({
                        items: result,
                        isLoaded: true
                    })
          }
        })
        /*fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result,
                        isLoaded: true
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })*/
    }
  
  componentWillMount(){
       // const game_id = this.props.game_id
        this.request('https://spairing-api.herokuapp.com/games/1')
    }
  
  componentDidMount(){
    const $ = window.$
    document.title = "SPairing";
    $(document).ready(function(){
      $('ul.tabs').tabs();
    })
  }

  render() {
    const { items, isLoaded } = this.state
    
    if(isLoaded){
      const pegi = this.state.items.pegi
      const pgp = this.state.items.player_game_profiles[0]
      const pgpNick = pgp.pgp_nickname
      const pgpRep = pgp.pgp_reputation
      const pgpRate = pgp.pgp_rate
      return (
          <div>
            <div className="row">
              <div className="center-align">
                <h1>{items.gam_name}</h1>
                <i className="large material-icons">info_outline</i>
                <p className="gameinfo">{items.gam_description}</p>
                <h7 className="secondary-color-text">{items.gam_link}</h7>
                <div className="row">
                  <h7>PEGI Rating: </h7>
                  <h7>{pegi.peg_name}</h7> <br/>
                  <img src={pegi.peg_image} alt="pegiImage" className="gameImage"/>
                </div>
              </div>
            </div>
            <div>
              <h3>Top Rated Player</h3>
              <ul className="collection">
                <li className="collection-item avatar">
                  <span className="title"><h5>{pgpNick}</h5></span><br/>
                  <h5>Reputation:</h5> <h5>{pgpRep}</h5><br/>
                   <h5>Rating:</h5> <h5>{pgpRate}</h5>
                  <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                </li>
              </ul>
            </div>
          </div>
      )
    }else{
            return (<h1>Loading...</h1>)
        }
  }
}

export default GameInfo
