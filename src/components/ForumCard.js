import React, { Component } from 'react'

class ForumCard extends Component {

    constructor(props){
        super(props)
        this.state = {
            show: false
        }
    }

    render(){
        const item = this.props.item
        
        return(
            <div class="row">
                <div class="col s12 m6">
                  <div class="card primary-color">
                    <div class="card-content white-text">
                      <span class="card-title">{item.id}</span> {/* Deberia ser el título del foro.*/}
                      <p>{item.question} <small> - {item.author}</small></p>
                    </div>
                    <div class="card-action">
                      <a href="!#" className="secondary-color-text ">Link a los hilos</a>
                    </div>
                  </div>
                </div>
              </div>
        )

    }
}

export default ForumCard