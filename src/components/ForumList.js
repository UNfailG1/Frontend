import React, { Component } from 'react'
import Forum from './Forum'
import Loading from './Loading'
import ErrorManager from './ErrorManager'
import { GET_AUTH } from '../js/requests'

class ForumList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      isLoaded: null,
      status: null
    }
  }

  componentWillMount() {
    // const game_id = this.props.game_id
    GET_AUTH('/games/1').then(
      (res) => {
        this.setState({
          items: res.data,
          isLoaded: true
        })
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

  render() {
    const { items, isLoaded } = this.state
    //const game_id = this.props.game_id
    var list
    console.log(items)
    if (isLoaded != null && isLoaded) {
      list = items.sub_forums.map((item, i) => (<li key={ i }><Forum item={ item }/></li>))
      return (<ul>{ list }</ul>)
    } else if(isLoaded == null) {
      return (<Loading />)
    } else {
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default ForumList
