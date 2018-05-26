import React from 'react'

// Components
import NotFound from '../helpers/NotFound'

const ErrorManager = ({ status }) => {

  switch(status){

    case 0:
      return (<h2 className="center-align">No server connection</h2>)

    case 404:
      return(<NotFound />)

    case 401:
      return (<h2 className="center-align">Not logged</h2>)

    case 500:
      return (<h2 className="center-align">Server Error</h2>)

    default:
      return (<h2>New error: { status }</h2>)
  }
}

export default ErrorManager
