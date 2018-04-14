import { createStore } from 'redux'

const initialState = {
  session: !!localStorage.getItem('spToken')
}

const reducer = (state, action) => {
  switch(action.type){

    case 'LOG_IN':
      return {
        ...state,
        session: !!localStorage.getItem('spToken')
      }

    case 'LOG_OUT':
      return {
        ...state,
        session: false
      }
  }
}

export default createStore(reducer, initialState)
