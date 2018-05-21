import React from 'react'

const PlayerGameProfile = ({ game, pgp }) => {

  const { gam_name, gam_image } = game
  const { pgp_nickname } = pgp
  const noMargin = { margin: 0 }
  return (
    
    <div className="card-panel" style={{ padding: 8 }}>
      <div className="row valign-wrapper" style={ noMargin }>
        <div className="col s4 m2 l2 valign-wrapper">
          <img src={ gam_image } alt="player_game_profile" className="responsive-img"/>
        </div>
        <div className="col s8 m10 l10">
          <div className="row" style={ noMargin }>
            <div className="col s12 m8 l8 valign-wrapper" style={{ height: 36 }}>
              <span style={{ fontSize: 18 }} className="truncate">{ pgp_nickname }</span><br />
              <small className="grey-text">{ gam_name }</small>
            </div>
            <div className="col s12 m4 l4">
              <button className="btn-flat waves-effect waves-light">
                edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerGameProfile
