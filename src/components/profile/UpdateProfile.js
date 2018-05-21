import React, { Component } from 'react'

// Assets
import { BASE_URL } from '../../js/assets'
import defaultAvatar from '../../assets/user.svg'
import { GET, PATCH, FPATCH } from '../../js/requests'

// Components
import Loading from '../helpers/Loading'
import ErrorManager from '../helpers/ErrorManager'

class UpdateProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      avatar: props.avatar,
      isLoaded: null,
      status: null
    }
  }

  componentDidMount(){
    GET('/locations').then(
      res => {
        this.setState({
          isLoaded: true,
          locations: res.data
        })
      }
    ).catch(
      error => {
        this.setState({
          isLoaded: false,
          status: (error.response) ? error.response.status : 0
        })
      }
    )
    const $ = window.$
    const Materialize = window.Materialize
    $(document).ready(function() {
      Materialize.updateTextFields()
      $('select').material_select()
    })
  }

  componentDidUpdate(){
    const $ = window.$
    const Materialize = window.Materialize
    $(document).ready(function() {
      Materialize.updateTextFields()
      $('select').material_select()
    })
  }

  handleChange(event){
    const avatar = URL.createObjectURL(event.target.files[0])
    this.setState({ avatar })
  }

  removeAvatar(event){
    event.preventDefault()
    this.setState({ avatar: null })
  }

  handleSubmit(event){

    event.preventDefault()
    const updateData = {
      "pp_username": document.getElementById("username").value,
      "email": document.getElementById("email").value,
      "location_id": document.getElementById("location").value
    }

    const newAvatar = document.getElementById("newAvatar").files[0]
    console.log(newAvatar);
    const data = new FormData()
    data.append('image', newAvatar)

    PATCH(`/player_profiles/${localStorage.getItem('userId')}`, updateData).then(
      (res) => {
        console.log(res)
      }
    )

    FPATCH(`/player_profiles_avatar/${localStorage.getItem('userId')}`, data).then(
      (res) => {
        console.log(res)
      }
    )
  }

  render(){
    const { username, email, location } = this.props
    const { isLoaded, avatar, locations } = this.state

    if(isLoaded){
      const avatarImg = ( avatar ) ?
        (<div className="col s12 m9 l9 center-align">
          <img className="responsive-img" alt="" src={ BASE_URL + avatar }
          height="160" width="160"/><br />
          <button className="btn-flat waves-effect waves-light primary-color"
            onClick={ (e) => this.removeAvatar(e) }>
            remove
          </button>
        </div>) :
        (<div className="col s12 m9 l9 center-align">
          <img className="responsive-img" alt="" src={ defaultAvatar }
          height="160" width="160"/>
        </div>)

      const list = locations.map(
        item => (
          <option value={ item.id } key={ item.id } className="primary-color-text">
            { item.loc_name }
          </option>
        )

      )
      const adjMargin = {
        marginLeft: 0,
        marginRight: 0
      }
      return (
        <form onSubmit={ (e) => this.handleSubmit(e) }>
          <div className="row" style={ adjMargin }>
            <h6><b>Username</b></h6>
            <div className="input-field col s12 m9 l9">
              <input id="username" type="text" defaultValue={ username }/>
            </div>
          </div>
          <div className="row" style={ adjMargin }>
            <h6><b>Email</b></h6>
            <div className="input-field col s12 m9 l9">
              <input id="email" type="email" defaultValue={ email }/>
            </div>
          </div>
          <div className="row" style={ adjMargin }>
            <h6><b>Profile Picture</b></h6><br />
            { avatarImg }
            <div className="file-field input-field col s12 m9 l9">
              <div className="btn secondary-color-dark">
                <span>load image</span>
                <input id="newAvatar" type="file" onChange={ (e) => this.handleChange(e) }/>
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
              </div>
            </div>
          </div>
          <div className="row" style={ adjMargin }>
            <h6><b>Location</b></h6>
            <div className="input-field col s12 m9 l9">
              <select id="location" defaultValue={ (location) ? location.id : 0 }>
                <option value="0" disabled>Choose your location</option>)
                { list }
              </select>
            </div>
          </div>
          <div className="row" style={ adjMargin }>
            <div className="input-field col s12 m9 l9 center-align">
              <button type="submit" className="btn waves-effect waves-light secondary-color">
                Update Profile
              </button>
            </div>
          </div>
        </form>
      )
    }else if(isLoaded === null){
      return (<Loading />)
    }else{
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default UpdateProfile
