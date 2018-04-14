import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Footer from './Footer'

const mainStyle = {
  'height': 'auto',
  'display': 'block'
}

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
        <main style={ mainStyle }>
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
