import React from 'react'
import ReactDOM from 'react-dom'

import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'

import App from './components/App'
import registerServiceWorker from './js/registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
