import React from 'react'

const PlayerGameProfile = ({ game, pgp }) => {

  const { gam_name, gam_image } = game
  const { pgp_nickname, pgp_reputation, pgp_rate } = pgp

  return (
    <div className="col s12 m9 l9">
      <div className="card horizontal">
        <div className="card-image">
          <img src={ gam_image } alt="Game" style={{ maxHeight: 200, height: 'min-content' }}/>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>
              <span style={{ fontSize: 22 }}>{ gam_name }</span><br />
              <b>Nickname: </b>{ pgp_nickname }<br />
              <b>Reputation: </b>{ pgp_reputation }<br />
              <b>Rate: </b>{ pgp_rate }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerGameProfile
