import React from 'react'

const CommentCard = ({ item }) => {

  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card primary-color">
          <div className="card-content white-text">
            <span className="card-title">{ item.thr_name }</span>
            <p>{ item.player_profile.pp_username }</p>
            <p>- { item.com_comment }</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentCard
