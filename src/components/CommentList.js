import React, { Component } from 'react'
import CommentCard from './CommentCard'
import Loading from './Loading'
import { GET_AUTH, POST_AUTH } from '../js/requests'

class CommentList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      isLoaded: false,
      error: null
    }
  }

  componentWillMount() {
    // const game_id = this.props.game_id
    GET_AUTH('/comments?page=3').then(
      (res) => {
        this.setState({
          items: res.data,
          isLoaded: true
        })
      }
    )
  }
  
  handleSubmit(event){
    event.preventDefault()
    const comment = document.getElementById('comment').value
    
    const commentary = {
      comment: {
        com_comment: comment,
        thread_forum_id: "1",
        player_profile_id: localStorage.getItem('userId')
      }
    }
    
    POST_AUTH('/comments', commentary).then(
          (res) => {
            //Validar si hubo un error en el servidor
            console.log(res)
            this.addComment(res.data)
          }
        )
  }
  
  addComment(comment){
    this.setState({ 
      items: this.state.items.concat([comment])
    })
  }

  render() {
    const { items, isLoaded } = this.state
    //const game_id = this.props.game_id
    var list
    
    console.log(items)
    console.log(items.length)
    if (isLoaded) {
      list = items.map((item, i) => (<li key={ i }><CommentCard item={ item }/></li>))
      return (<div>
        <ul>{ list }</ul>
        <form onSubmit={ (e) => this.handleSubmit(e)}>
          <div className="row">
            <div className = "col s12 m6 center-aligned">
            <h5>Comment: </h5>
              <div className="input-field">
                <label htmlFor="comment"></label>
                <input id="comment" type="text"/>
              </div>
              <button className="waves-effect waves-light btn primary-color" onClick={this.addComment}>Make Comment</button>
            </div>
          </div>
        </form>
      </div>)
    } else {
      return (<Loading />)
    }
  }

}

export default CommentList
