import React from 'react'

// Assets
import { noImage } from '../../js/assets'

const GameItem = ({ game }) => {

  const gam_img = (game.gam_image) ? game.gam_image : noImage

  return (
    <div className="col s12 m4 l4">
      <div className="card sticky-action">
          <div className="card-image">
            <img className="activator" src={ gam_img } style={{ 'height': '250px' }} alt={ game.gam_name }/>
            <span className="truncate activator card-title">{ game.gam_name }</span>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              <i className="material-icons right">close</i>
              { game.gam_name }
            </span><br />
            <a href={ `/game/${game.id}` }>See more...</a>
          </div>
      </div>
    </div>
  )
}

export default GameItem
