import React, { Component } from 'react'

// Assets
import { GET_AUTH } from '../../js/assets'

class FriendAction extends Component {
  constructor(props) {
    super(props)
  }

  addFriend(){
    GET_AUTH(`/friend_request/:receiver_id`).then(
      res => {

      }
    ).catch(
      error => {

      }
    )

  }

  removeFriend(){
    GET_AUTH(`/remove_friend/:receiver_id`).then(
      res => {

      }
    ).catch(
      error => {
        
      }
    )
  }

  render(){
    return (

    )
  }
}
