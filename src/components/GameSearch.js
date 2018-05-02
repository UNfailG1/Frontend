import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../js/requests'

// Components
import Loading from './Loading'
import ErrorManager from './ErrorManager'

class GameSearch extends Component{

  constructor(props){
    super(props)
    this.state = {
      isLoaded: true,
      status: null
    }
    this.games = {}
  }

  componentWillMount(){

  }

  handleChange(event){
    const gam_name = event.target.value
    GET_AUTH(`/gameslike?gam_name=${ gam_name }&page=1`).then(
      (res) => {
        this.setState({
          isLoaded: true
        })
        this.uploadGames(res.data)
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

  }

  uploadGames(games){
    const $ = window.$
    var aux = {}, withIds = {}, aux2 = this.games

    games.forEach(
      (game) => {
        aux[game.gam_name] = null
        withIds[game.gam_name] = game.id
      }
    )
    console.log(aux);

    $('input.autocomplete').autocomplete({
      data: aux,
      limit: 10,
      onAutocomplete: (val) => {
        aux2[val] = withIds[val]
      },
      minLength: 1
    })

    this.games = aux2

  }


  render(){
    const { items, isLoaded } = this.state

    if(isLoaded){
      return(
        <div className="row">
          <div className="input-field col s8 offset-s2">
            <i className="material-icons prefix" >search</i>
            <input type="text" id="autocomplete-input" className="autocomplete"
              placeholder="Search a game" onChange={ (e) => this.handleChange(e) }/>

            </div>
          </div>
      )
    }else if(isLoaded == null){
      return(<Loading />)
    }else{
      return(<ErrorManager status={ this.state.status } />)
    }


  }


}

export default GameSearch
