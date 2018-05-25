import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../../js/requests'

// Components
import Settings from './Settings'
import Loading from '../helpers/Loading'
import PlayerProfile from './PlayerProfile'
import ErrorManager from '../helpers/ErrorManager'

class Profile extends Component {

  constructor(props) {
    super(props)
    const { match: { params: { param } } } = props
    this.PROFILE = 0
    this.SETTINGS = 1
    this.pLoaded = false
    this.rLoaded = false
    this.relationsLists = null
    this.locked = false
    this.curProfile = param
    this.state = {
      view: (param === 'settings') ? this.SETTINGS : this.PROFILE,
      profile: {},
      isLoaded: null,
      status: null
    }
  }

  componentDidMount(){
    this.requests()
  }

  checkLocks(){
    const { match: { params: { param } } } = this.props
    const userId = (param === 'settings') ? null : param
    const ownId = localStorage.getItem('userId')
    if(this.rLoaded){
      const { current: { c_locks }, player: { p_locks } } = this.relationsLists
      return p_locks.includes(parseInt(ownId,10)) || c_locks.includes(parseInt(userId,10))
    }
    return false
  }

  requests(){
    const { match: { params: { param } } } = this.props
    const settings = param === 'settings'
    const userId = (settings) ? localStorage.getItem('userId') : param
    const own = settings || localStorage.getItem('userId') === param

    GET_AUTH(`/player_profiles/${userId}`).then(
      res => {
        this.pLoaded = true
        this.setState({
          profile: res.data,
          isLoaded: (own) ? this.pLoaded : this.pLoaded && this.rLoaded
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

    if(own){
      this.rLoaded = false
      this.relationsLists = null
    }else{

      GET_AUTH(`/relation_status/${userId}`).then(
        (res) => {
          this.rLoaded = true
          this.relationsLists = res.data
          this.locked = this.checkLocks()
          this.setState({
            isLoaded: this.pLoaded && this.rLoaded
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
  }

  changeView = (event) => {
    event.preventDefault()
    this.setState({ view: this.SETTINGS })
  }

  get_data = (data) => {
    this.rLoaded = true
    this.relationsLists = data
    const cl = this.checkLocks()
    this.setState({ locked: cl })
  }

  render(){
    const { isLoaded, profile} = this.state
    if(isLoaded){
      const fixHeight = { height: 'auto', minHeihgt: 'calc(100% - 110px)' }
      const { match: { params: { param } } } = this.props
      const own = (param === 'settings') ? false : localStorage.getItem('userId') === param
      var content = null
      if(this.props.match.params.param === 'settings') {
        content = (<Settings profile={ profile } />)
      } else {
        content = (<PlayerProfile profile={ profile } own={ own }
          relationsLists={ this.relationsLists } get_data={ this.get_data } />)
      }

      return (
        <main style={ fixHeight }>
          { content }
        </main>
      )

    }else if(isLoaded == null){
      return (
        <main style={{ height: 'calc(100% - 110px)' }}>
          <Loading />
        </main>
      )
    }else{
      return (
        <main style={{ height: 'calc(100% - 110px)' }}>
          <ErrorManager status={ this.state.status } />
        </main>
      )
    }
  }
}

export default Profile
