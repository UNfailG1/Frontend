import React from 'react'

const GameDescription = ({ game }) => {
  const { genres, platforms, gam_description } = game
  const genresList = genres.map(g => g.gen_name).join(', ')
  const platformsList = platforms.map(p => p.plat_name).join(', ')

  return (
    <div>
      <p className="flow-text">
        <b>Genre: </b>
        { genresList }
      </p>
      <p className="flow-text">
        <b>Platforms: </b>
        { platformsList }
      </p>
      <p className="flow-text">
        <br/>
        <b>Description: </b>
        { gam_description }
      </p>
    </div>
  )
}

export default GameDescription
