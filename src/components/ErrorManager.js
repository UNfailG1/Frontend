import React from 'react'
import NotFound from './NotFound'

const ErrorManager = ( { status } ) => {

  if (status === 404){
    return(<NotFound />)
  }
  return(<div>{ status }</div> )
}

export default ErrorManager
