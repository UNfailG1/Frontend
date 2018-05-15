import React, { Component } from 'react'

// Assets
import { BASE_URL } from '../../js/assets'
import defaultAvatar from '../../assets/user.svg'
import login_img from '../../assets/login_img.jpg'
import { GET, GET_AUTH, PATCH, FPATCH } from '../../js/requests'

// Components
import Loading from '../helpers/Loading'

class UpdateProfile extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: '',
      email: '',
      location_id: '',
      items: [],
      loading: true,
      avatar: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount(){
    GET('/locations').then(
      (res) => {
        this.setState({
          loading: false,
          items: res
        })
      }
    )
    const route = "/player_profiles/".concat(localStorage.getItem('userId'))
    GET_AUTH(route).then(
      (res) => {
        const url = res.data.pp_avatar.url
        this.setState({
          avatar: (url) ?  BASE_URL + url : url ,
        })
      }
    )
  }

  componentDidMount(){
    const $ = window.$
    document.title = 'Settings'
    $(document).ready(function() {
      $('select').material_select()
    })
  }

  componentDidUpdate(){
      const $ = window.$
      $(document).ready(function() {
        $('select').material_select()
      })
   }

  handleChange(event){
    const avatar = URL.createObjectURL(event.target.files[0])
    this.setState({ avatar })
  }


  handleSubmit(event){
    event.preventDefault()
    const updateData = {
      "pp_username": document.getElementById("username").value,
      "email": document.getElementById("email").value,
      "location_id": document.getElementById("location").value
    }

    const route = "/player_profiles/".concat(localStorage.getItem('userId'))
    const newAvatar =  document.getElementById("newAvatar").files[0]
    const data =  new FormData()
    data.append('image', newAvatar)

    PATCH(route, updateData).then(
      (res) => {
        console.log(res)
      }
    )
    const route0 = "/player_profiles_avatar/".concat(localStorage.getItem('userId'))
    FPATCH(route0, data).then(
      (res) => {
        console.log(res)
      }
    )
  }

  render(){

    if(this.state.loading === false){
      const {items, avatar} = this.state
      var avatarImg = ( avatar ) ?
          <img className="circle responsive-img" alt="" src={ avatar } height="160" width="160"/> :
          <img className="circle responsive-img" alt="" src={ defaultAvatar } height="160" width="160"/>
      var list = items.data.map(
        item => (
          <option value={ item.id } key={ item.id } className="primary-color-text">
            { item.loc_name }
          </option>
        )
      )
      return (
        <figure className="back_image">
          <img src={ login_img } alt="login_image"/>
          <figcaption>
            <div className="center-align form-panel">
              <div className="card-panel white">
                <form onSubmit={ (e) => this.handleSubmit(e)}>
                  <h5>Update your Profile</h5>
                  { avatarImg }
                  <div className="file-field input-field">
                    <div className="btn primary-color">
                      <span>File</span>
                      <input id="newAvatar" type="file" onChange={(e) => this.handleChange(e)}/>
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text"/>
                    </div>
                  </div>
                  <div className="input-field">
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text"/>
                  </div>
                  <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email"/>
                  </div>
                  <div className="input-field">
                    <select id="location">
                      <option value="" disabled>Choose your location</option>
                      {list}
                    </select>
                    <label htmlFor="location">Location</label>
                  </div>
                  <button className="waves-effect waves-light btn primary-color">Update profile</button>
                </form>
              </div>
            </div>
          </figcaption>
        </figure>
      )
    }
    else{
      return(<Loading />)
    }
  }
}

export default UpdateProfile
