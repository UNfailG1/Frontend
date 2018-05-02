import React, { Component } from 'react'
import Comment from './Comment'
import Loading from './Loading'
import ErrorManager from './ErrorManager'
import { GET_AUTH, POST_AUTH } from '../js/requests'

class CommentList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      isLoaded: null,
      status: null
    }
  }

  componentWillMount() {
    // const game_id = this.props.game_id
    GET_AUTH('/comments?page=2').then(
      (res) => {
        this.setState({
          items: res.data,
          isLoaded: true
        })
      }
    ).catch(
      (error) => {
        this.setState({
          isLoaded: false,
          status: (error.response != null) ? error.response.status : 0
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
        this.addComment(res.data)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }

  addComment(comment){
    const list = this.state.items.slice()
    list.push(comment)

    this.setState({
      items: list
    })
  }

  render() {
    const { items, isLoaded } = this.state
    //const game_id = this.props.game_id
    var list
    if (isLoaded != null && isLoaded) {
      list = items.map((item) => (<li key={ item.id }><Comment item={ item }/></li>))
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
              <button className="waves-effect waves-light btn primary-color">Make Comment</button>
            </div>
          </div>
        </form>
      </div>)
    } else if(isLoaded == null){
      return (<Loading />)
    }else{
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default CommentList
