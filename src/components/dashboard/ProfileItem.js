import React from 'react'

// Assets
import user from '../../assets/user.svg'

// Components
import { Link } from 'react-router-dom'

const ProfileItem = ({ profile }) => {

  const avatar = (profile.pp_avatar.url) ? profile.pp_avatar.url : user

  return (
    <div className="col s12 m3 l3">
      <Link to={ `/profile/${profile.id}` }>
        <div className="card">
          <div className="card-image">
            <img className="responsive-img" src={ avatar } alt={ profile.pp_username } />
            <span className="card-title truncate">{ profile.pp_username }</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProfileItem
