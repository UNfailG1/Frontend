import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../../js/requests'

// Components
import Loading from '../helpers/Loading'
import ErrorManager from '../helpers/ErrorManager'

class Profile extends Component {
  constructor(props) {
    this.PROFILE = 0
    this.SETTINGS = 1
    this.pLoaded = false
    this.rLoaded = false
    this.relationsLists = null
    this.curProfile = props.match.params.userId
    this.state = {
      view: this.PROFILE,
      lock: 
      profile: {},
      isLoaded: null,
      status: null
    }
  }

  componentDidMount(){

    const { match: { params: { userId } } } = this.props
    if(userId !== this.curProfile){
      this.rLoaded = false
      this.relationsLists = null
      this.setState({
        isLoaded: null,
        locked: null
      })
      this.curProfile = userId
    }

    if(this.state.isLoaded === null){
      this.requests()
    }
  }

  checkLocks(){
    const { match: { params: { userId } } } = this.props
    const ownId = localStorage.getItem('userId')
    if(this.rLoaded){
      const { current: { c_locks }, player: { p_locks } } = this.relationsLists
      return p_locks.includes(parseInt(ownId,10)) || c_locks.includes(parseInt(userId,10))
    }
    return false
  }

  requests(){
    const own = localStorage.getItem('userId') === userId
    const { match: { params: { userId } } } = this.props
    var cl = null

    GET_AUTH(`/player_profiles/${localStorage.getItem('userId')}`).then(
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
          cl = this.checkLocks()
          this.setState({
            isLoaded: this.pLoaded && this.rLoaded,
            locked: cl
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

  handleClick = (event) => {
    event.preventDefault()
    this.setState({ view: this.SETTINGS })
  }

  render(){
    const { isLoaded, view, profile } = this.state
    if(isLoaded){
      const fixHeight = { height: 'auto', minHeihgt: 'calc(100% - 110px)' }
      switch (view) {
        case this.PROFILE:
          const { match: { params: { userId } } } = this.props
          const own = userId === localStorage.getItem('userId')
          return (
            <PlayerProfile profile={ profile } own={ own }
            relationsLists={ this.relationsLists }/>
          )

        case this.SETTINGS:
          return (<Settings profile={ profile } />)

        default:
          return (<div>Error</div>)

      }
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
