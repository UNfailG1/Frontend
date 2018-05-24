import React from 'react'

// Components
import Friend from './Friend'

const FriendsList = ({ friends, own }) => {

  if(friends.length === 0){
    return (<h4 className="center-align">You don't have friends to show</h4>)
  }

  const list = friends.map(
    friend => <Friend key={ friend.id } friend={ friend } own={ own }/>
  )

  return (
    <div className="row">
      <div className="col s12">
        { list }
      </div>
    </div>
  )
}

export default FriendsList
