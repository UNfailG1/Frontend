import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Footer from './Footer'

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }

  render() {
    const { children } = this.props
    return (
      <div>
        <header>
          <Header/>
        </header>
        <main style={{'height': 'auto', 'display': 'block'}}>
          { children }
        </main>
        <footer className="page-footer primary-color">
          <Footer/>
        </footer>
      </div>
    )
  }
}

export default App
