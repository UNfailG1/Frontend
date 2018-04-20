import React, { Component } from 'react'
import PlatformItem from './PlatformItem'
import Loading from './Loading'
import { GET_AUTH } from '../js/requests'

class Platform extends Component {

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
    GET_AUTH('/platforms').then(
      (res) => {
        this.setState({
          items: res.data,
          isLoaded: true
        })
      }
    )
  }

  initCollapsible(){
    const $ = window.$
    document.title = "Platforms"
    $(document).ready(function() {
      $('.collapsible').collapsible()
    })
  }

  componentDidMount() {
    this.initCollapsible()
  }

  // Asegurarse del funcionamiento de materialize
  componentDidUpdate() {
    this.initCollapsible()
  }

  render() {
    const { items, isLoaded } = this.state
    //const game_id = this.props.game_id
    var list
    if (isLoaded) {
      list = items.map((item) => (<li key={ item.id }><PlatformItem item={ item }/></li>))
      return (<ul className="collapsible">{ list }</ul>)
    } else {
      return (<Loading />)
    }
  }
}

export default Platform
