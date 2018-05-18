import React from 'react'

// Assets
import defaultAvatar from '../../assets/user.svg'

const Friend = ({ friend }) => {

  return (
    <div className="col s12 m9 l9">
      <div className="card horizontal">
        <div className="card-image">
          <img src={ defaultAvatar } alt="Profile" style={{ maxHeight: 200, height: 'min-content' }}/>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>
              <span style={{ fontSize: 22 }}>{ "Nombre amigo" }</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Friend
