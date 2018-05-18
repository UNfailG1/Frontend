import React from 'react'

const AdItem = ({ item }) => {

  return (
    <div>
      <div className="col s12">
        <div className="card horizontal">
          <div className="card-image">
            <img src={item.img} alt='' height="160" width="160"/>
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <p>{item.desc}</p>
            </div>
            <div className="card-action">
              <a href={item.link}>More info</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdItem