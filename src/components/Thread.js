import React from 'react'

const Thread = ({ item, onClick }) => {
  const { thr_name } = item
  const noMargin = { margin: 0 }

  return (
    <div className="row valign-wrapper" style={ noMargin }>
      <div className="col s7">
        <p>
          <b><a href="#!" onClick={ () => onClick() }>{ thr_name }</a></b>
        </p>
      </div>
      <div className="col s2 center-align">
        Una cantidad
      </div>
      <div className="col s3 center-align">
        Una fechita
      </div>
    </div>
  )
}

export default Thread
