import React, { Component } from 'react'

// Components
import Header from './Header'
import Footer from './Footer'

class App extends Component {

  render() {
    const { children } = this.props
    return (
      <div>
        <header>
          <Header/>
        </header>
        { children }
        <footer className="page-footer primary-color" style={{ padding: 0 }}>
          <Footer/>
        </footer>
      </div>
    )
  }
}

export default App
