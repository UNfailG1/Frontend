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
        console.log(token)
        $.ajax({
          url: url,
          type: "GET",
          beforeSend: function(xhr){xhr.setRequestHeader('Authorization', token)},
          context: this, // Allows us to use this.setState inside success
          success: function (result) {
            console.log(result)
            this.setState({
                        items: JSON.stringify(result),
                        isLoaded: true
                    })
          }
        })
        console.log(this.state.isLoaded)
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
    const { item, isLoaded } = this.state
    const pegi = this.state.item.pegi
    const pgp = this.state.item.player_game_profiles
    
    
    if(isLoaded){
      const pgpNick = pgp.map((p) => <h5 key={p.pgp_nickname}>{p.pgp_nickname}</h5>)
      const pgpRep = pgp.map((p) => <h5 key={p.pgp_reputation}>{p.pgp_reputation}</h5>)
      const pgpRate = pgp.map((p) => <h5 key={p.pgp_rate}>{p.pgp_rate}</h5>)
      return (
          <div>
            <div className="row">
              <div className="center-align">
                <h1>{item.gam_name}</h1>
                <i className="large material-icons">info_outline</i>
                <p className="gameinfo">{item.gam_description}</p>
                <h7 className="secondary-color-text">{item.gam_link}</h7>
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
                  <span className="title">{pgpNick}</span>
                  <h5>Reputation:</h5> {pgpRep}<br/>
                   <h5>Rating:</h5> {pgpRate}
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
