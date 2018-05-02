import React, { Component } from 'react'
import ThreadCard from './ThreadCard'
import Loading from './Loading'
import ErrorManager from './ErrorManager'
import { GET_AUTH } from '../js/requests'

class ThreadList extends Component {

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
    GET_AUTH('/sub_forums').then(
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
    console.log(items.length)
    if (isLoaded != null && isLoaded) {
      const threads = items[0].thread_forums
      if(threads.length > 0)
      {
        list = threads.map((item, i) => (<li key={ i }><ThreadCard item={ item }/></li>))
        return (<ul>{ list }</ul>)
      }
      else {
        return (<h3>No threads at the moment. Be the first to start one!</h3>)
      }
    } else if(isLoaded == null) {
      return (<Loading />)
    } else {
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default ThreadList
