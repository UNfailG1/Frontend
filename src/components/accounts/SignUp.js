import React, { Component } from 'react'
// import { Geocode } from 'react-geocode'

// Assests
import store from '../../js/store'
import { POST } from '../../js/requests'
import { login } from '../../js/actions'
import register_img from '../../assets/register_img.jpg'

// Components
import Loading from '../helpers/Loading'
import ErrorManager from '../helpers/ErrorManager'

class SignUp extends Component{

  constructor(props){
    super(props)
    this.state = {
      eqPass: null,
      items: [],
      isLoaded: null,
      status: null,
      logginIn: false,
      country: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.getReverseGeocodingData = this.getReverseGeocodingData.bind(this)
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
    this.setState({ isLoaded: true })
  }

  handleSubmit( event ){
    event.preventDefault()
    this.setState({ logginIn: true })
    const profile = {
      "player_profile": {
        "pp_username": document.getElementById("username").value,
        "password": document.getElementById("password").value,
        "password_confirmation": document.getElementById("cpass").value,
        "email": document.getElementById("email").value
      }
    }

    // this.locateUser()

    POST('/player_profiles', profile).then(
      (res) => {
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
          }
        )
      }
    ).catch(
      (error) => {
        this.setState({ logginIn: false})
      }
    )
  }

  handleChange(event){
    const password = document.getElementById("password").value
    const cpass = event.target.value
    var eqPass = cpass === password
    this.setState({ eqPass })
  }

  // locateUser(){
  //   const $ = window.$
  //   const check = $('#Location').prop('checked')
  //
  //   if(check === true){
  //     this.getLocation()
  //   }
  //   else{
  //     console.log("Permission to locate denied")
  //   }
  // }

  // getLocation = () => {
  //   const geolocation = navigator.geolocation;
  //
  //   geolocation.getCurrentPosition((position) => {
  //     this.getReverseGeocodingData(position.coords.latitude, position.coords.longitude)
  //   })
  // }

  // getReverseGeocodingData(lat, lng) {
  //
  //   Geocode.fromLatLng(lat, lng).then(
  //     response => {
  //       const address = response.results[8].formatted_address
  //       console.log(address)
  //       this.setState({country: address})
  //     },
  //     error => {
  //       console.error(error)
  //     }
  //   )
  // }

  render(){

    const { eqPass, isLoaded, logginIn } = this.state

    if(logginIn){
      return (<Loading />)
    }

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

    if(isLoaded){
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
                <div>
                  <p>
                    In order to improve our pairing recommendations and suggest players near you,
                    we need your permission to obtain your location.
                    Please check the checkbox bellow if you agree to share your location with us.
                  </p>
                  <p>
                    <input type="checkbox" id="Location" />
                    <label htmlFor="Location">Share Location?</label>
                  </p>
                  <p/>
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
      return (<ErrorManager status={this.state.status} />)
    }
  }
}

export default SignUp
