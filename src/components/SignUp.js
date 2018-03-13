import React, { Component } from 'react'

class SignUp extends Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      cpass: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit( event ){
    //axios
  }

  handleChange( event ){
    const target = event.target
    const value = target.value
    const name = target.id

    this.setState({
      [name]: value
    })
  }

  render(){
    return(
      <div className="card-panel white center-align form-panel">
        <h5>Create your personal account.</h5>
        <form onSubmit={this.handleSubmit}>
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" onChange={this.handleChange}/>
          </div>
          <div className="input-field ">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field ">
            <label  htmlFor="password">Password</label>
            <input id="password" type="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="cpass">Confirm Password</label>
            <input id="cpass" type="password" onChange={this.handleChange}/>
          </div>
            <a className="waves-effect waves-light btn primary-color">Sign Up</a>
        </form>
       </div>
    )
  }
}

export default SignUp
