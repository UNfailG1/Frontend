import React, { Component } from 'react'
import register_img from '../assets/register_img.jpg'

class SignUp extends Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      cpass: ''
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
      email: document.getElementById("email").value
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
                pattern="[a-z0-9]+$" minlength ="4" maxlength="20"/>
              </div>
              <div className="input-field">
                <label htmlFor="cpass">Confirm Password</label>
                <input id="cpass" type="password" onChange={this.handleChange}
                pattern="[a-z0-9]+$" minlength ="4" maxlength="20" required/>
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
