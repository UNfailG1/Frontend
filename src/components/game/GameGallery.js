import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../../js/requests'

// Components
import Loading from '../helpers/Loading'
import ErrorManager from '../helpers/ErrorManager'

class GameGallery extends Component {

  constructor(props){
    super(props)

    this.state = {
      items: [],
      isLoaded: null,
      status: null,
    }
  }

  componentWillMount(){
    const { gameId } = this.props

    GET_AUTH(`/games/${gameId}/screenshots`).then(
      res => {
        console.log(res.data);
        this.setState({
          isLoaded: true,
          items: res.data
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

  render(){
    const { items, isLoaded } = this.state

    if(isLoaded){
      var list = null, url = null
      return (<div>Screenshots</div>)
    }else if(isLoaded == null) {
      return (<Loading />)
    }else{
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default GameGallery
