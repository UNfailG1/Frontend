import React, { Component } from 'react'
import login_img from '../assets/login_image.jpg'

class SignIn extends Component {

  componentDidMount(){
    document.title = 'Sign in'
  }

  handleSubmit(event){
    event.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    console.log('user: ', username)
    console.log('password: ', password)
  }

  render(){
    return (
      <figure className="back_image">
        <img src={login_img} alt="The Pulpit Rock"/>
        <figcaption>
          <div className="center-align form-panel">
            <div className="card-panel white">
              <form onSubmit={ (e) => this.handleSubmit(e)}>
              <h5>Sign in to Spairing</h5>
                <div className="input-field">
                  <label htmlFor="username">Username or email</label>
                  <input type="text" id="username"/>
                </div>
                <div className="input-field">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password"/>
                </div>
                <button className="waves-effect waves-light btn primary-color">Sign In</button>
              </form>
            </div>
            <div className="card-panel blue lighten-5">
              <span>Are you new on Spairing? <br/><a href="">Create an Account</a></span>
            </div>
          </div>
        </figcaption>
      </figure>
    )
  }
}

export default SignIn
