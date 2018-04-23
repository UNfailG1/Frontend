import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Footer from './Footer'

const mainStyle = {
  'height': 'auto',
  'minHeight': '560px',
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
        <footer className="page-footer primary-color" style={{'padding': 0}}>
          <Footer/>
        </footer>
      </div>
    )
  }
}

export default App
