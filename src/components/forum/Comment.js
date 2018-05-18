import React from 'react'

// Assets
import user from '../../assets/user.svg'
import { BASE_URL } from '../../js/assets'
import { dateTime } from '../../js/helpers'

const Comment = ({ item }) => {
  const { com_comment, player_profile, created_at } = item
  const { pp_avatar, pp_username } = player_profile
  const avatar = (pp_avatar.url) ? BASE_URL + pp_avatar.url : user
  const noMargin = { margin: 0 }
  return (
    <div className="row" style={ noMargin }>
      <div className="col s12">
        <div className="card-panel">
          <div className="row" style={ noMargin }>
            <div className="col s12 m3 l3 center-align">
              <h5 className="truncate">{ pp_username }</h5>
              <img src={ avatar } alt="" className="circle" />
            </div>
            <div className="col s12 m9 l9">
              <div className="section">
                <p style={ noMargin }>{ dateTime(created_at) }</p>
              </div>
              <div className="divider"></div>
              <div className="section">
                <p className="flow-text">{ com_comment }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment
