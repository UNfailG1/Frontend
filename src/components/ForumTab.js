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
    this.breadcrumbs = []
    this.state = {
      view: this.FORUMS,
      object: {},
      isLoaded: null,
      status: null
    }
  }

  renderThreadsList(subForumId){
    this.setState({
      view: this.THREADS,
      isLoaded: null,
      object: {}
    })
    this.breadcrumbs.push({
      view: this.THREADS,
      id: subForumId
    })
    this.request()
  }

  renderCommentsList(threadId){
    this.setState({
      view: this.COMMENTS,
      isLoaded: null,
      object: {}
    })
    this.breadcrumbs.push({
      view: this.COMMENTS,
      id: threadId
    })
    this.request()
  }

  request(){
    const last = this.breadcrumbs[this.breadcrumbs.length -1]
    const { view, id } = last
    var url = null
    switch(view){
      case this.THREADS:
        url = `/sub_forums/${id}`
        break

      case this.COMMENTS:
        url = `/thread_forums/${id}`
        break;

      default:
        url = "/"
        break
    }
    console.log(url);

    GET_AUTH(url).then(
      res => {
        console.log(res.data);
        this.setState({
          isLoaded: true,
          object: res.data
        })
      }
    ).catch(
      error => {
        console.log(error);
        this.setState({
          isLoaded: false,
          status: (error.response) ? error.response.status : 0
        })
      }
    )
  }

  render(){
    const { items } = this.props
    const { view, object, isLoaded } = this.state
    var list = null

    if(view === this.FORUMS){

      list = items.map(
        subForum => (
          <li key={ subForum.id } className="collection-item">
            <Forum item={ subForum } onClick={ () => this.renderThreadsList(subForum.id) }/>
          </li>
        )
      )
      return (
        <ul className="collection">
          { list }
        </ul>
      )

    }else if(view === this.THREADS || view === this.COMMENTS) {
      if(isLoaded){
        list = (view === this.COMMENTS) ?
          object.comments.map(
            comment => (
              <li key={ comment.id } className="collection-item">
                <Comment item={ comment } />
              </li>
            )
          )
        :
          object.thread_forums.map(
            thread => (
              <li key={ thread.id } className="collection-item">
                <Thread item={ thread } onClick={ () => this.renderCommentsList(thread.id) }/>
              </li>
            )
          )

        return (
          (view === this.COMMENTS) ?
            <ul className="collection with-header">
              <li className="collection-header"><h4>{ object.thr_name }</h4></li>
              { list }
            </ul>
          :
            <ul className="collection with-header">
              <li className="collection-header"><h4>{ object.sf_name }</h4></li>
              { list }
            </ul>
        )

      }else if(isLoaded == null) {
        return (<Loading />)
      }else{
        return (<ErrorManager status={ this.state.status } />)
      }
    }
  }
}

export default ForumTab
