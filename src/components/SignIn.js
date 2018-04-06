import React, { Component } from 'react'
import login_img from '../assets/login_image.jpg'
//import { connect } from 'react-redux'
//import { login } from '../js/login'
import PropTypes from 'prop-types'
import $ from 'jquery'

/*export const AUTH_GET_TOKEN = '[Auth] AUTH_GET_TOKEN' 

function addToken(token) {
  return {
    type: AUTH_GET_TOKEN,
    token
  }
}*/

class SignIn extends Component {

  componentDidMount(){
    document.title = 'Sign in'
  }

  handleSubmit(event){
    const regUser = /^.+@.+\..+$/;
    const regPassword = /[a-z0-9]+$/;
    event.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    var matchEmail = username.match(regUser)
    var matchPassword = password.match(regPassword)
    if (matchEmail){
      if (matchEmail.index === 0){
        this.setState({usernameState: true});
      }else{
         this.setState({usernameState: false});
      }
    }else{
      this.setState({usernameState: false});
    }
    if (matchPassword){
      if (matchPassword.index === 0){
        this.setState({passwordState: true});
      }else{
         this.setState({passwordState: false});
      }
    }else{
      this.setState({passwordState: false});
    }
    if(this.usernameState && this.passwordState){
      this.setState({ error: {} , isLoading: true})
      this.props.login(this.state).then(
        (res) => this.context.history.router.push('/'),
        (err) => this.setState({errors:err.data.errors, isLoading:false})
      )
    }
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
        console.log("Usuario Invalido")
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

/*SignIn.propTypes = {
  login: PropTypes.func.isRequired
}*/

SignIn.contextTypes = {
  router: PropTypes.object.isRequired
}

export default SignIn
//export default connect(null,{login})(SignIn)
