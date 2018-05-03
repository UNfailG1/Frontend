import React, { Component } from 'react'

// Components
import Forum from './Forum'
import Thread from './Thread'
import Loading from './Loading'
import Comment from './Comment'
import ErrorManager from './ErrorManager'

// Assets
import { GET_AUTH } from '../js/requests'

class ForumTab extends Component {

  constructor(props){
    super(props)
    this.FORUMS = 0
    this.THREADS = 1
    this.COMMENTS = 2
    this.breadcrumbs = [{
      bc_id: 0,
      bc_link: {
        view: this.FORUMS,
        id: props.gameId
      }
    }]
    this.threadId = null
    this.threadName = null
    this.subForumId = null
    this.subForumName = null
    this.state = {
      view: this.FORUMS,
      items: [],
      isLoaded: null,
      status: null,
    }
  }

  componentWillMount(){
    this.request(this.FORUMS)
  }

  renderThreadsList(subForumId, subForumName){
    this.setState({
      view: this.THREADS,
      isLoaded: null,
      items: []
    })
    const last = this.breadcrumbs[this.breadcrumbs.length-1].bc_id
    this.breadcrumbs.push({
      bc_id: last+1,
      bc_link: {
        view: this.THREADS,
        id: subForumId
      }
    })
    this.subForumId = subForumId
    this.subForumName = subForumName
    this.request(this.THREADS)
  }

  renderCommentsList(threadId, threadName){
    this.setState({
      view: this.COMMENTS,
      isLoaded: null,
      items: []
    })
    const last = this.breadcrumbs[this.breadcrumbs.length-1].bc_id
    this.breadcrumbs.push({
      bc_id: last+1,
      bc_link: {
        view: this.COMMENTS,
        id: threadId
      }
    })
    this.threadId = threadId
    this.threadName = threadName
    this.request(this.COMMENTS)
  }

  handleClickBC(bc_id){
    var last = this.breadcrumbs[this.breadcrumbs.length-1].bc_id
    while(bc_id !== last){
      this.breadcrumbs.pop()
      last = this.breadcrumbs[this.breadcrumbs.length-1].bc_id
    }
  }

  request(view){
    const { gameId } = this.props
    var url = null
    switch(view){

      case this.FORUMS:
        url = `/games/${gameId}/sub_forums`
        break

      case this.THREADS:
        url = `/games/${gameId}/sub_forums/${this.subForumId}/thread_forums`
        break

      case this.COMMENTS:
        url = `/games/${gameId}/sub_forums/${this.subForumId}/thread_forums/${this.threadId}/comments`
        break;

      default:
        url = "/"
        break
    }

    GET_AUTH(url).then(
      res => {
        this.setState({
          isLoaded: true,
          items: res.data
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
  }

  render(){
    const { view, items, isLoaded } = this.state

    if(isLoaded){
      var list = null
      switch(view){

        case this.FORUMS:
          list = items.map(
            subForum => (
              <li key={ subForum.id } className="collection-item">
                <Forum item={ subForum }
                  onClick={ () => this.renderThreadsList(subForum.id, subForum.sf_name) }/>
              </li>
            )
          )

          return (
            <ul className="collection with-header">
              <li className="collection-header"><h4>Forums</h4></li>
              { list }
            </ul>
          )

        case this.THREADS:
          list = items.map(
            thread => (
              <li key={ thread.id } className="collection-item">
                <Thread item={ thread }
                  onClick={ () => this.renderCommentsList(thread.id, thread.thr_name) }/>
              </li>
            )
          )
          return (
            <ul className="collection with-header">
              <li className="collection-header"><h4>Forum: { this.subForumName }</h4></li>
              { list }
            </ul>
          )

        case this.COMMENTS:
          list = items.map(
            comment => (<Comment key={ comment.id } item={ comment } />)
          )
          return (
            <div>
              <ul className="collection with-header">
                <li className="collection-header"><h4>Thread: { this.threadName }</h4></li>
                <li style={{ padding: '10px 20px' }}>{ list }</li>
              </ul>
              { /*Aqui falta un componente (CommentCreator)*/ }
            </div>
          )

        default:
          return (<h1>Error</h1>)
      }
    }else if(isLoaded == null) {
      return (<Loading />)
    }else{
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default ForumTab
