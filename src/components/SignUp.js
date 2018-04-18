import React, { Component } from 'react'
import store from '../js/store'
import { POST } from '../js/requests'
import register_img from '../assets/register_img.jpg'
import { login } from '../js/actions'

//TODO 56:Validar si hubo un error en el servidor

class SignUp extends Component{
  constructor(props){
    super(props)
    this.state = {
      eqPass: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    document.title = 'Sign up'
  }

  handleSubmit( event ){
    event.preventDefault()

    const profile = {
      "player_profile": {
        "pp_username": document.getElementById("username").value,
        "password": document.getElementById("password").value,
        "password_confirmation": document.getElementById("cpass").value,
        "email": document.getElementById("email").value,
        "location_id": 1
      }
    }

    console.log(profile)

    POST('/player_profiles', profile).then(
      (res) => {
        console.log(res)
        const crendentials = {
          auth: {
            email: profile.player_profile.email,
            password: profile.player_profile.password
          }
        }
        POST('/player_profile_token', crendentials).then(
          (res) => {
            //Validar si hubo un error en el servidor
            localStorage.setItem('spToken', res.data.jwt)
            store.dispatch(login())
          }
        )
      }
    )
  }

  handleChange(event){
    const password = document.getElementById("password").value
    const cpass = event.target.value
    var eqPass = cpass === password
    this.setState({ eqPass })
  }

  render(){
    
    const { eqPass } = this.state
    
    var equalPass = null
    if(eqPass != null && !eqPass){
      equalPass = (
        <div className="input-field" style={{'marginBottom': 16, 'marginTop': 0}}>
          <p className="red-text center-align" style={{'marginTop': 0}}>
            Passwords mismatch
          </p>
        </div>
      )
    }

    return(
      <figure className="back_image">
        <img src={ register_img } alt="una imagen mas"/>
        <figcaption>
          <div className="card-panel white center-align form-panel">
            <h5>Create your personal account.</h5>
            <form onSubmit={ this.handleSubmit }>
              <div className="input-field">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" pattern="([a-zA-Z]+)([\w\.\-]*)" 
                  title="Must begin with a letter" required/>
              </div>
              <div className="input-field ">
                <label htmlFor="email">email</label>
                <input id="email" type="email" 
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" 
                  title="Must contain the symbol '@' followed of a domain" required/>
              </div>
              <div className="input-field ">
                <label  htmlFor="password">Password</label>
                <input id="password" type="password" 
                  pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
                  title="Must contain at least one number, one letter and at least
                  8 or more characters"/>
              </div>
              <div className="input-field">
                <label htmlFor="cpass">Confirm Password</label>
                <input id="cpass" type="password" onChange={ this.handleChange }
                pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}" required/>
              </div>
              { equalPass }
              <button className="btn waves-effect waves-light primary-color" 
              type="submit">Sign Up</button>
            </form>
           </div>
        </figcaption>
      </figure>
    )
  }
}

export default SignUp
