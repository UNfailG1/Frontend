import React from 'react'

const CommentCard = ({ item }) => {

  const { player_profile, com_comment } = item

  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card primary-color">
          <div className="card-content white-text">
            <span className="card-title">{ player_profile.pp_username }</span>
            <p>- { com_comment }</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentCard
