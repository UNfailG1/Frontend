import React, { Component } from 'react'
import PlatformItem from './PlatformItem'
import Loading from './Loading'
import ErrorManager from './ErrorManager'
import { GET_AUTH } from '../js/requests'

class Platform extends Component {

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
    GET_AUTH('/platforms').then(
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
          status: error.response.status
        })
      }
    )
  }

  initCollapsible(){
    const $ = window.$
    $(document).ready(function() {
      $('.collapsible').collapsible()
    })
  }

  componentDidMount() {
    document.title = 'Platforms'
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
    if (isLoaded != null && isLoaded) {
      list = items.map((item) => (<li key={ item.id }><PlatformItem item={ item }/></li>))
      return (<ul className="collapsible">{ list }</ul>)
    } else if(isLoaded == null) {
      return (<Loading />)
    } else {
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default Platform
