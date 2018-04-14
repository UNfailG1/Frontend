import React, { Component } from 'react'
import ForumCard from './ForumCard'
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
    GET_AUTH('/games/1/sub_forums').then(
      (res) => {
        this.setState({
          items: res,
          isLoaded: true
        })
      }
    )
  }

  render() {
    const { items, isLoaded } = this.state
    //const game_id = this.props.game_id
    if (isLoaded) {
      var list
      list = items.map((item) => <ForumCard key={ item.id } item={ item }/>)
      return (<ul>{ list }</ul>)
    } else {
      return (<h1>Loading...</h1>)
    }
  }

}

export default ForumList
