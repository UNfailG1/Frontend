import React, { Component } from 'react'

// Assets
import { BASE_URL } from '../../js/assets'
import defaultAvatar from '../../assets/user.svg'
import { GET, PATCH, FPATCH } from '../../js/requests'

class UpdateProfile extends Component {
  constructor(props) {
    super(props)
    this.location = 0
    this.avatar_removed = null
    this.state = {
      avatar: props.avatar,
    }
  }

  componentDidMount(){
    const $ = window.$
    const Materialize = window.Materialize
    $(document).ready(function() {
      Materialize.updateTextFields()
    })
  }

  componentDidUpdate(){
    const $ = window.$
    const Materialize = window.Materialize
    $(document).ready(function() {
      Materialize.updateTextFields()
    })
  }

  handleChange(event){
    const avatar = URL.createObjectURL(event.target.files[0])
    this.setState({ avatar })
  }

  handleSearch(event){
    event.preventDefault()
    const loc_name = event.target.value
    GET(`/locations?loc_name=${loc_name}`).then(
      res => {
        this.updateLocations(res.data)
      }
    ).catch(
      error => {
        console.log(error);
      }
    )
  }

  updateLocations(data){
    const $ = window.$
    var aux = {}, with_ids = {}, locationId = {}

    if(data.length > 0){
      data.forEach(
        (location) => {
          aux[location.loc_name] = null
          with_ids[location.loc_name] = location.id
        }
      )
    }

    $('input.autocomplete').autocomplete({
      data: aux,
      limit: 5,
      onAutocomplete: function(val){
        locationId['location_id'] = with_ids[val]
      },
      minLength: 1
    })
    this.location = locationId
  }

  removeAvatar(event){
    event.preventDefault()
    this.avatar_removed = true
    this.setState({ avatar: null })
  }

  handleSubmit(event){
    event.preventDefault()
    const updateData = {
      "pp_username": document.getElementById("username").value,
      "email": document.getElementById("email").value,
      "location_id": (this.location.location_id) ? this.location.location_id : 0
    }
    console.log(updateData)

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
    const { avatar } = this.state
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
            <input type="text" id="autocomplete-input" className="autocomplete"
              onChange={ (e) => this.handleSearch(e) }
              defaultValue={ (location) ? location.loc_name : null }/>
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
  }
}

export default UpdateProfile
