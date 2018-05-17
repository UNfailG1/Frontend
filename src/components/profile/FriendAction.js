import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../../js/requests'

class FriendAction extends Component {

  constructor(props){
    super(props)
    this.senderId = localStorage.getItem('userId')
    this.senderFriends = props.lists.sender_friends
    this.receiverFriends = props.lists.receiver_friends
    this.areFriends = 0
    this.requestSent = 1
    this.notFriends = 2
    this.requestReceived = 3
    this.state = {
      friendStatus: null
    }
  }

  componentWillMount(){
    this.friendStatusCalc()
  }

  addFriend(event){

    event.preventDefault()
    const { friendId } = this.props

    GET_AUTH(`/friend_request/${friendId}`).then(
      res => {
        this.updateLists(res.data)
      }
    ).catch(
      error => {
        console.log(error)
      }
    )

  }

  removeFriend(event){

    event.preventDefault()
    const { friendId } = this.props

    GET_AUTH(`/remove_friend/${friendId}`).then(
      res => {
        this.updateLists(res.data)
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  }

  updateLists(data){
    const { sender_friends, receiver_friends } = data
    this.senderFriends = sender_friends
    this.receiverFriends = receiver_friends
    this.friendStatusCalc()
  }

  friendStatusCalc(){
    const { friendId } = this.props
    if(this.senderFriends.includes(parseInt(friendId, 10))){
      if(this.receiverFriends.includes(parseInt(this.senderId, 10))) {
        this.setState({ friendStatus: this.areFriends })
      }else{
        this.setState({ friendStatus: this.requestSent })
      }
    }else if(this.receiverFriends.includes(parseInt(this.senderId, 10))){
      this.setState({ friendStatus: this.requestReceived })
    }else{
      this.setState({ friendStatus: this.notFriends })
    }
  }

  render(){

    const { friendStatus } = this.state
    const maxWidth = { width: '100%' }
    const adjMargin = { marginBottom: 8 }
    switch (friendStatus) {

      case this.areFriends:
        return (
          <div className="center-align" style={ adjMargin }>
            <button className="waves-effect waves-light btn primary-color-light"
              onClick={ (e) => this.removeFriend(e) } style={ maxWidth }>
              Remove Friend
            </button>
          </div>
        )

      case this.requestSent:
        return (
          <div className="center-align" style={ adjMargin }>
            <button className="waves-effect waves-light btn primary-color-light"
              onClick={ (e) => this.removeFriend(e) } style={ maxWidth }>
              Cancel request
            </button>
          </div>
        )

      case this.notFriends:
        return (
          <div className="center-align" style={ adjMargin }>
            <button className="waves-effect waves-light btn secondary-color"
              onClick={ (e) => this.addFriend(e) } style={ maxWidth } >
              Add Friend
            </button>
          </div>
        )

      case this.requestReceived:
        return (
          <div className="center-align" style={ adjMargin }>
            <button className="waves-effect waves-light btn secondary-color col s6"
              onClick={ (e) => this.addFriend(e) } >
              Accept request
            </button>
            <button className="waves-effect waves-light btn secondary-color col s6"
              onClick={ (e) => this.removeFriend(e) } >
              Decline request
            </button>
          </div>
        )

      default:
        return (
          <p>Error con este boton :(</p>
        )
    }
  }
}

export default FriendAction
