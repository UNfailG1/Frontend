import React, { Component } from 'react'
import ForumCard from './ForumCard'
import Loading from './Loading'
import { GET_AUTH } from '../js/requests'

class ForumList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      isLoaded: false,
      error: null
    }
  }

  componentWillMount() {
    // const game_id = this.props.game_id
    GET_AUTH('/games/4').then(
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
    //const game_id = this.props.game_id
    var list
    console.log(items)
    if (isLoaded) {
      list = items.sub_forums.map((item, i) => (<li key={ i }><ForumCard item={ item }/></li>))
      return (<ul>{ list }</ul>)
    } else {
      return (<Loading />)
    }
  }

}

export default ForumList
