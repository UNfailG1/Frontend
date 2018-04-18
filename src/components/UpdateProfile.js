import React, { Component } from 'react'
import login_img from '../assets/login_image.jpg'
import { GET, PATCH } from '../js/requests'
import $ from 'jquery'

class UpdateProfile extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: '',
      email: '',
      location_id: '',
      items: [],
      loading: true
    }
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
    document.title = 'Settings'
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
  

  handleSubmit(event){
    event.preventDefault()
    const updateData = {
      "pp_username": document.getElementById("username").value,
      "email": document.getElementById("email").value,
      "pp_spairing_elo": parseFloat(document.getElementById("rating").value),
      "location_id": document.getElementById("location").value
    }
    
    PATCH('/player_profiles/10', updateData)
  }

  render(){
    if(this.state.loading === false){
      const {items} = this.state
      var list = items.data.map((item) => <option value={item.id} key={item.id} className="primary-color-text"> {item.loc_name} </option>)
      return (
        <figure className="back_image">
          <img src={ login_img } alt="login_image"/>
          <figcaption>
            <div className="center-align form-panel">
              <div className="card-panel white">
                <form onSubmit={ (e) => this.handleSubmit(e)}>
                <h5>Update your Profile</h5>
                  <div className="input-field">
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text"/>
                  </div>
                  <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" pattern="(([a-zA-Z]+)([\w\.\-]*)\@([\w\.\-]*)\.([\w\.\-]*))" required/>
                  </div>
                  <div className="input-field">
                    <label htmlFor="rating">Rating</label>
                    <input id="rating" type="text"/>
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
      return(<h5>Loading...</h5>)
    }
  }
}

export default UpdateProfile
