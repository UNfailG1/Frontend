import React from 'react'

// Components
import PlayerGameProfile from './PlayerGameProfile'

const PGPList = ({ games, pgps }) => {

  if(games.length !== pgps.length){
    return (<h4 className="center-align">Error</h4>)
  }else if(games.length === 0){
    return (<h4 className="center-align">There aren't games to show</h4>)
  }

  const list = []
  for (var i = 0; i < games.length; i++) {
    list.push(
      <PlayerGameProfile key={ i } game={ games[i] } pgp={ pgps[i] } />)
  }
  return (
    <div className="row">
      <div className="col s12">
        { list }
      </div>
    </div>
  )
}

export default PGPList
