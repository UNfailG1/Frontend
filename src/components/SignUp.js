import React, { Component } from 'react'
import register_img from '../assets/register_img.jpg'
import $ from 'jquery'

class SignUp extends Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      cpass: '',
      location_id: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    document.title = 'Sign up'
  }

  handleSubmit( event ){
    event.preventDefault()
    this.setState({
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      cpass: document.getElementById("cpass").value,
      location_id: "1"
    })
    
    const profile = {"player_profile": {"pp_username": this.state.username, "password": this.state.password, 
                      "password_confirmation": this.state.cpass, "email": this.state.email, "location_id":this.state.location_id}}
    console.log(profile)
    //ogin(request)
    $.ajax({
      url: "https://spairing-api.herokuapp.com/player_profiles",
      type: "POST",
      data: profile,
      dataType: "json",
      success: function (result) {
        console.log(result)
        //this.props.dispatch(addToken("jwt", result.jwt))
        localStorage.setItem("jwt", result.jwt)
      },
      error:function() {
        console.log("Usuario Invalido")
        //dispatch()
      }
    })
  }

  handleChange( event ){
    const target = event.target
    const value = target.value
    const name = target.id

    this.setState({
      [name]: value
    })
    console.log(this.state);
  }

  render(){
    return(
      <figure className="back_image">
        <img src={register_img} alt="una imagen mas"/>
        <figcaption>
          <div className="card-panel white center-align form-panel">
            <h5>Create your personal account.</h5>
            <form onSubmit={this.handleSubmit}>
              <div className="input-field">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" pattern="(([a-zA-Z]+)([\w\.\-]*))" required/>
              </div>
              <div className="input-field ">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" pattern="(([a-zA-Z]+)([\w\.\-]*)\@([\w\.\-]*)\.([\w\.\-]*))" required/>
              </div>
              <div className="input-field ">
                <label  htmlFor="password">Password</label>
                <input id="password" type="password" onChange={this.handleChange}
                pattern="[a-z0-9]+$" minLength ="4" maxLength="20"/>
              </div>
              <div className="input-field">
                <label htmlFor="cpass">Confirm Password</label>
                <input id="cpass" type="password" onChange={this.handleChange}
                pattern="[a-z0-9]+$" minLength ="4" maxLength="20" required/>
              </div>
              <button className="btn waves-effect waves-light primary-color" type="submit">Sign Up</button>
            </form>
           </div>
        </figcaption>
      </figure>

    )
  }
}

export default SignUp
