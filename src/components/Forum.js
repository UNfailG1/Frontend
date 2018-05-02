import React from 'react'

const Forum = ({ item }) => {

  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card primary-color">
          <div className="card-content white-text">
            <span className="card-title">{ item.sf_name }</span>
            {/* Deberia ser el título del foro. */}
            <p>
              { item.sf_description }
              <small>
                - { item.game_id }</small>
            </p>
          </div>
          <div className="card-action">
            <a href="/threads" className="secondary-color-text ">Sub-threads</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forum
