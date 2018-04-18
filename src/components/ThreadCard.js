import React from 'react'

const ThreadCard = ({ item }) => {

  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card primary-color">
          <div className="card-content white-text">
            <span className="card-title">{ item.thr_name }</span>
            <p>Thread Views: { item.thr_views }</p>
            <p>Comment Count: { item.thr_comments }</p>
          </div>
          <div className="card-action">
            <a href="!#" className="secondary-color-text ">Comments</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreadCard
