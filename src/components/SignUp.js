import React, { Component } from 'react'
import store from '../js/store'
import { GET, POST } from '../js/requests'
import register_img from '../assets/register_img.jpg'
import { login } from '../js/actions'
import $ from 'jquery'

//TODO 56:Validar si hubo un error en el servidor

class SignUp extends Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      cpass: '',
      location_id: '',
      items: [],
      loading: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  
  componentWillMount(){
    GET('/locations').then(
      (res) => {
        //console.log(res)
        this.setState({
            loading: false,
            items: res
        })
      }  
    )
  }
  
  componentDidMount(){
    document.title = 'Sign up'
    $(document).ready(function() {
      $('select').material_select();
    });
  }
  
  // Asegurarse del funcionamiento de materialize
  componentDidUpdate(){
      const $ = window.$
      $(document).ready(function() {
        $('select').material_select();
      });
  }

  handleSubmit( event ){
    event.preventDefault()

    const profile = {
      "player_profile": {
        "pp_username": document.getElementById("username").value,
        "password": document.getElementById("password").value,
        "password_confirmation": document.getElementById("cpass").value,
        "email": document.getElementById("email").value,
        "location_id": document.getElementById("location").value
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
    const target = event.target
    const value = target.value
    const name = target.id

    this.setState({
      [name]: value
    })
  }

  render(){

    // username pattern="(([a-zA-Z]+)([\w\.\-]*))"
    // Email pattern="(([a-zA-Z]+)([\w\.\-]*)\@([\w\.\-]*)\.([\w\.\-]*))"
    // password pattern="[a-z0-9]+$"
    // cpass pattern="[a-z0-9]+$"
    if(this.state.loading === false){
      //console.log(this.state)
      
      const {items} = this.state
      
      var list
              list = items.data.map((item) => <option value={item.id} key={item.id} className="primary-color-text"> {item.loc_name} </option>)
      
      return(
        <figure className="back_image">
          <img src={ register_img } alt="una imagen mas"/>
          <figcaption>
            <div className="card-panel white center-align form-panel">
              <h5>Create your personal account.</h5>
              <form onSubmit={ this.handleSubmit }>
                <div className="input-field">
                  <label htmlFor="username">Username</label>
                  <input id="username" type="text" required/>
                </div>
                <div className="input-field ">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" required/>
                </div>
                <div className="input-field">
                  <select id="location">
                    <option value="" disabled>Choose your location</option>
                    {list}
                  </select>
                  <label htmlFor="location">Location</label>
                </div>
                <div className="input-field ">
                  <label  htmlFor="password">Password</label>
                  <input id="password" type="password" onChange={ this.handleChange }
                  minLength ="4" maxLength="20"/>
                </div>
                <div className="input-field">
                  <label htmlFor="cpass">Confirm Password</label>
                  <input id="cpass" type="password" onChange={ this.handleChange }
                  minLength ="4" maxLength="20" required/>
                </div>
                <button className="btn waves-effect waves-light primary-color" type="submit">Sign Up</button>
              </form>
             </div>
          </figcaption>
        </figure>
      )
    }
    else{
      return(<h5>Loading</h5>)
    }
  }
}

export default SignUp
