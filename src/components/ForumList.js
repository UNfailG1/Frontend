import React, { Component } from 'react'
import ForumCard from './ForumCard'
import Loading from './Loading'
import { GET_AUTH } from '../js/requests'

class ForumList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      isLoaded: null
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
        this.setState({ isLoaded: false })
      }
    )
  }

  render() {
    const { items, isLoaded } = this.state
    //const game_id = this.props.game_id
    var list
    console.log(items)
    if (isLoaded != null && isLoaded) {
      list = items.sub_forums.map((item, i) => (<li key={ i }><ForumCard item={ item }/></li>))
      return (<ul>{ list }</ul>)
    } else if(isLoaded == null) {
      return (<Loading />)
    } else {
      return (<h1>Server error</h1>)
    }
  }
}

export default ForumList
