import React, { Component } from 'react'
import login_img from '../assets/login_image.jpg'
import $ from 'jquery'
//import axios from 'axios'
//import { connect } from 'react-redux';

export const AUTH_GET_TOKEN = '[Auth] AUTH_GET_TOKEN' 

function addToken(token) {
  return {
    type: AUTH_GET_TOKEN,
    token
  }
}

/*export function login(data){
  return dispatch => {
    return axios.post('https://spairing-api.herokuapp.com/player_profile_token',data).then(
        res => {
          const token = res.data.token;
          localStorage.setItem("jwt", token)
        }
      )
  }
}*/
class SignIn extends Component {
  
  componentDidMount(){
    document.title = 'Sign in'
  }

  handleSubmit(event){
    event.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const request = {"auth": {"email": username, "password": password}}
    console.log('user: ', username)
    console.log('password: ', password)
    console.log(request)
    //ogin(request)
    $.ajax({
      url: "https://spairing-api.herokuapp.com/player_profile_token",
      type: "POST",
      data: request,
      dataType: "json",
      success: function (result) {
        console.log(result)
        //this.props.dispatch(addToken("jwt", result.jwt))
        localStorage.setItem("jwt", result.jwt)
      },
      error:function() {
        console.log("Eso no existe :'v")
        //dispatch()
      }
    })
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
                <h6><br/><a href="/resetpassword">Forgot your password?</a></h6>
              </form>
            </div>
            <div className="card-panel blue lighten-5">
              <span>Are you new on Spairing? <br/><a href="/register">Create an Account</a></span>
            </div>
          </div>
        </figcaption>
      </figure>
    )
  }
}
export default SignIn
