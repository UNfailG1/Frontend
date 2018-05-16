import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../../js/requests'

class FriendAction extends Component {

  addFriend(event, friendId){
    event.preventDefault()
    
    GET_AUTH(`/friend_request/${friendId}`).then(
      res => {
        console.log(res.data)
      }
    ).catch(
      error => {
        console.log(error)
      }
    )

  }

  removeFriend(event, friendId){
    event.preventDefault()
    GET_AUTH(`/remove_friend/${friendId}`).then(
      res => {
        console.log(res.data)
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  }
  
  render(){
    const { areFriends, friendId } = this.props
    return (
      <button className="waves-effect waves-light btn primary-color"
        onClick={ (e) => (areFriends) ? this.removeFriend(e, friendId) : this.addFriend(e, friendId) } >
        { (areFriends) ? "Remove Friend" : "Add Friend" }
      </button>
    )
  }
}
