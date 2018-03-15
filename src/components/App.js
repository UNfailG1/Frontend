import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
// import Main from './Main'
import Footer from './Footer'

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }

  render() {
    const { children } = this.props
    console.log(children);
    return (
      <div>
        <Header/>
        {/* <Main/> */}
        { children }
        <Footer/>        
      </div>
    )
  }
}

export default App
