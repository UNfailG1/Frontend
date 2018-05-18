import React, { Component } from 'react'

class Sponsors  extends Component {

  render() {
    return (
      <div>
        <div className="row center-align">
          <h2>Proudly Sponsored By</h2>
        </div>
        <div className="row center-align">
          <a href='https://www.riotgames.com/en'><img className="responsive-img sponsor-img" alt="" src={'https://cdn.freebiesupply.com/logos/large/2x/riot-games-logo-black-and-white.png'} height="160" width="160"/></a>
          <a href='https://www.epicgames.com/site/en-US/home'><img className="responsive-img sponsor-img" alt="" src={'https://cdn.freebiesupply.com/logos/large/2x/epic-games-2-logo-png-transparent.png'} height="160" width="160"/></a>
          <a href='https://reactjs.org/'><img className="responsive-img sponsor-img" alt="" src={'https://cdn.freebiesupply.com/logos/large/2x/react-logo-png-transparent.png'} height="160" width="160"/></a>
          <a href='https://www.xbox.com'><img className="responsive-img sponsor-img" alt="" src={'https://cdn.freebiesupply.com/logos/large/2x/xbox-2-logo-png-transparent.png'} height="320" width="320"/></a>
        </div>
        <div className="row center-align">
          <a href='https://slack.com/'><img className="responsive-img sponsor-img" alt="" src={'https://cdn.freebiesupply.com/logos/large/2x/slack-logo-png-transparent.png'} height="240" width="240"/></a>
          <a href='https://www.rockstargames.com/'><img className="responsive-img sponsor-img" alt="" src={'https://cdn.freebiesupply.com/logos/large/2x/rockstar-games-logo-png-transparent.png'} height="160" width="160"/></a>
          <a href='https://www.nintendo.com/'><img className="responsive-img sponsor-img" alt="" src={'https://cdn.freebiesupply.com/logos/large/2x/nintendo-2-logo-png-transparent.png'} height="200" width="200"/></a>
          <a href='https://www.atari.com/'><img className="responsive-img sponsor-img" alt="" src={'https://cdn.freebiesupply.com/logos/large/2x/atari-games-703-logo-png-transparent.png'} height="160" width="160"/></a>
        </div>
        <div className="row center-align secondary-color-light-text">
          <h5>Want to become a sponsor? Contact Us Here</h5>
        </div>
      </div>
    )
  }
}

export default Sponsors