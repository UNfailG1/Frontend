import React, { Component } from 'react'

// Assets


// Components
import LockedProfile from './LockedProfile'

class LockedProfilesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: props.locked
    }
  }

  render(){
    return (
      <LockedProfile profile={ null } />
    )
  }
}

export default LockedProfilesList
