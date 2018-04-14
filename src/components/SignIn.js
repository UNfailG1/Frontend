import React, { Component } from 'react'
import login_img from '../assets/login_image.jpg'
import PropTypes from 'prop-types'
import { login } from '../js/actions'
import { POST } from '../js/requests'

class SignIn extends Component {

  componentDidMount() {
    document.title = 'Sign in'
  }

  handleSubmit(event) {
    const regUser = /^.+@.+\..+$/
    const regPassword = /[a-z0-9]+$/
    event.preventDefault()
    const email = document.getElementById('username').value
    const password = document.getElementById('password').value

    // var matchEmail = username.match(regUser)
    // var matchPassword = password.match(regPassword)
    //
    // this.setState({usernameState: matchEmail && matchEmail.index === 0})
    // this.setState({passwordState: matchPassword && matchPassword.index === 0})

    // if(this.usernameState && this.passwordState){
    //   this.setState({
    //     error: {},
    //     isLoading: true
    //   })
    //
    //   this.props.login(this.state).then(
    //     (res) => this.context.history.router.push('/'),
    //     (err) => this.setState({errors:err.data.errors, isLoading:false})
    //   )
    // }

    const credentials = {
      "auth": {
        "email": email,
        "password": password
      }
    }

    POST('/player_profile_token', credentials).then(
      (res) => {
        if (res.jwt) {
          localStorage.setItem('spToken', res.jwt)
          login()
        } else {
          //La contraseña es incorrecta

          //No esta registrado
        }
    })
  }

  render() {
    return (
      <figure className="back_image">
        <img src={login_img} alt="The Pulpit Rock"/>
        <figcaption>
          <div className="center-align form-panel">
            <div className="card-panel white">
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <h5>Sign in to Spairing</h5>
                <div className="input-field">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email"/>
                </div>
                <div className="input-field">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password"/>
                </div>
                <button className="waves-effect waves-light btn primary-color">Sign In</button>
                <h6><br/>
                  <a href="/resetpassword">Forgot your password?</a>
                </h6>
              </form>
            </div>
            <div className="card-panel blue lighten-5">
              <span>Are you new on Spairing?
                <br/>
                <a href="/register">Create an account</a>
              </span>
            </div>
          </div>
        </figcaption>
      </figure>
    )
  }
}

export default SignIn
