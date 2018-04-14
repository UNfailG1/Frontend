import React from 'react'

ForumCard = ({ item }) => {

  return (
    <div class="row">
      <div class="col s12 m6">
        <div class="card primary-color">
          <div class="card-content white-text">
            <span class="card-title">{ item.sf_name }</span>
            {/* Deberia ser el título del foro. */}
            <p>
              { item.sf_description }
              <small>
                - { item.game_id }</small>
            </p>
          </div>
          <div class="card-action">
            <a href="!#" className="secondary-color-text ">Link a los hilos</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForumCard
