import React, { Component } from 'react'
import store from '../js/store'
import { GET, POST } from '../js/requests'
import register_img from '../assets/register_img.jpg'
import { login } from '../js/actions'
import Loading from './Loading'

// TODO: Verificar error en linea 87 y 94

class SignUp extends Component{

  constructor(props){
    super(props)
    this.state = {
      eqPass: null,
      items: [],
      isLoaded: null,
      logginIn: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount(){
    GET('/locations').then(
      (res) => {
        this.setState({
          items: res,
          isLoaded: true
        })
      }
    ).catch(
      (error) => {
        this.setState({ isLoaded: false })
      }
    )
  }

  initSelect(){
    const $ = window.$
    $(document).ready(function() {
      $('select').material_select()
    })
  }

  componentDidMount(){
    document.title = 'Sign up'
    this.initSelect()
  }

  componentWillUpdate(){
    this.initSelect()
  }

  handleSubmit( event ){

    event.preventDefault()
    this.setState({ logginIn: true })
    const profile = {
      "player_profile": {
        "pp_username": document.getElementById("username").value,
        "password": document.getElementById("password").value,
        "password_confirmation": document.getElementById("cpass").value,
        "email": document.getElementById("email").value,
        "location_id": document.getElementById("location").value,
      }
    }

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
            localStorage.setItem('spToken', res.data.jwt)
            localStorage.setItem('userId', res.data.user_id)
            store.dispatch(login())
          }
        ).catch(
          (error) => {
            this.setState({ logginIn: false})
            console.log(error)
          }
        )
      }
    ).catch(
      (error) => {
        this.setState({ logginIn: false})
        console.log(error)
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

    const { eqPass, items, isLoaded, logginIn } = this.state

    if(logginIn){
      return (<Loading />)
    }

    var equalPass = null, list = null
    if(eqPass != null && !eqPass){
      equalPass = (
        <div className="input-field" style={{'marginBottom': 16, 'marginTop': 0}}>
          <p className="red-text center-align" style={{'marginTop': 0}}>
            Passwords mismatch
          </p>
        </div>
      )
    }

    if(isLoaded != null && isLoaded){
      list = items.data.map(
        (item) => (
          <option value={ item.id } key={ item.id }>
            { item.loc_name }
          </option>
        )
      )

      return (
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
                <div className="input-field">
                  <label htmlFor="email">email</label>
                  <input id="email" type="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                    title="Must contain the symbol '@' followed of a domain" required/>
                </div>
                <div className="input-field" style={{ 'height': 66 }}>
                  <select id="location" defaultValue="">
                    <option value="" disabled selected>Location</option>
                    { list }
                  </select>
                </div>
                <div className="input-field">
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
    }else if(isLoaded == null){
      return (<Loading />)
    }else{
      return (<h1>Server error</h1>)
    }
  }
}

export default SignUp
