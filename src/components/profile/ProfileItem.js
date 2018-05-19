import React from 'react'

// Assets
import user from '../../assets/user.svg'

const ProfileItem = ({ profile }) => {

  const avatar = (profile.pp_avatar.url) ? profile.pp_avatar.url : user

  return (
    <div className="col s12 m3 l3">
      <a href={ `/profile/${profile.id}` }>
        <div className="card">
          <div className="card-image">
            <img src={ avatar } alt={ profile.pp_username } />
            <span className="card-title truncate">{ profile.pp_username }</span>
          </div>
        </div>
      </a>
    </div>
  )
}

export default ProfileItem
