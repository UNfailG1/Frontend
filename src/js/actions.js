login = () => {
  return {
    type: 'LOG_IN',
  }
}

logout = () => {
  return {
    type: 'LOG_OUT'
  }
}

export { login, logout }
