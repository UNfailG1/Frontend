import React from 'react'

// Components
import Friend from './Friend'

const FriendsList = ({ friends }) => {

  if(friends.length === 0){
    return (<h4 className="center-align">There aren't friends to show</h4>)
  }

  const list = friends.map(
    friend => <Friend key={ friend.id } friend={ friend } />
  )

  return (
    <div className="row">
      { list }
    </div>
  )
}

export default FriendsList
