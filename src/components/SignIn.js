/* global gapi */
import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'

//Assets
import store from '../js/store'
import { login } from '../js/actions'
import { POST } from '../js/requests'
import login_img from '../assets/login_image.jpg'

class SignIn extends Component {

  constructor(props){
    super(props)
    this.state = {
      error: false
    }
  }

  componentDidMount() {
    document.title = 'Sign in'
  }

  handleSubmit(event) {

    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const credentials = {
      "auth": {
        "email": email,
        "password": password
      }
    }

    POST('/player_profile_token', credentials).then(
      (res) => {
        console.log(res)
        if (res.data.jwt) {
          localStorage.setItem('spToken', res.data.jwt)
          localStorage.setItem('userId', res.data.user_id)
          store.dispatch(login())
        } else {
          //La contraseña es incorrecta

          //No esta registrado
        }
    }).catch(
      (error) => {
        this.setState({error: true})
      }
    )
  }

  responseGoogle = (response) => {
    const data = {id_token: response.Zi.id_token }
    axios({
      url: '/google_authentication',
      method: 'post',
      baseURL: 'http://localhost:3001',
      headers: { 'Content-Type': 'application/json' },
      data
    }).then(
    (res) => {
      if (res.data.jwt) {
        localStorage.setItem('spToken', res.data.jwt)
        store.dispatch(login())
      } else {
        //La contraseña es incorrecta

        //No esta registrado
      }
    })
  }

  render() {
    const { error } = this.state
    var errorMessage = null
    if(error){
      errorMessage = (
        <div className="input-field" style={{'marginBottom': 16, 'marginTop': 0}}>
          <p className="red-text center-align" style={{'marginTop': 0}}>
            Email or password are incorrect
          </p>
        </div>
        )
    }
    return (
      <figure className="back_image">
        <img src={ login_img } alt="The Pulpit Rock"/>
        <figcaption>
          <div className="center-align form-panel">
            <div className="card-panel white">
              <form onSubmit={ (e) => this.handleSubmit(e) }>
                <h5>Sign in to Spairing</h5>
                <div className="input-field">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                  title="Must contain the symbol '@' followed of a domain"/>
                </div>
                <div className="input-field">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password"
                    pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
                    title="Must contain at least one number, one letter and at
                    least 8 or more characters"/>
                </div>
                { errorMessage }
                <button className="waves-effect waves-light btn primary-color">
                Sign In
                </button>
                <button className="waves-effect waves-light btn primary-color" style={{"marginBottom": "20px"}}>Sign In</button>
                <GoogleLogin
                    clientId="544479097367-vsgksn1j0h4p6kv9glqhq6h6pffbs5l4.apps.googleusercontent.com"
                    buttonText="Sign in with Google"
                    onSuccess={this.responseGoogle}
                />
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
