import React, { Component } from 'react'

class SignUp extends Component{
  render(){
    return(
      <div className="card-panel white center-align form-panel">
        <h5>Create your personal account.</h5>
        <form>
          <div className="input-field">
            <label for="username">Username</label>
            <input id="username" type="text"/>
          </div>
          <div className="input-field ">
            <label for="email">Email</label>
            <input id="email" type="email"/>
          </div>
          <div className="input-field ">
            <label  for="password">Password</label>
            <input id="password" type="password"/>
          </div>
          <div className="input-field">
            <label for="cpass">Confirm Password</label>
            <input id="cpass" type="password" />
          </div>
            <a className="waves-effect waves-light btn primary-color">Sign Up</a>
        </form>
       </div>
    )
  }
}

export default SignUp
