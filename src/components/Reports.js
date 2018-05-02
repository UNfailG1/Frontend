import React, { Component } from 'react'
import { GET, BASE_URL } from '../js/requests'
import Loading from './Loading'
import ErrorManager from './ErrorManager'

class Reports extends Component{

  constructor(props){
    super(props)
    this.state = {
      items: [],
      isLoaded: null,
      status: null
    }
  }

  componentWillMount(){
    GET('/reports').then(
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
          status: (error.response) ? error.response.status : 0  
        })
      }
    )
  }

  render(){
    const { items, isLoaded } = this.state
    var reports = []

    if (isLoaded != null && isLoaded) {
      const keys = Object.keys(items).map(
        (type, index) => {
          reports.push([])
          items[type].forEach(
            (report) => {
              reports[index].push(
                <li key={ report.id }>
                  <a href={ BASE_URL + '/' + report.link } target="_blank" >
                    { report.filename }
                  </a>
                </li>
              )
            }
          )
          return (
            <li key={ index }>
              <h5>{ type }</h5>
              <ul>{ reports[index] }</ul>
            </li>
          )
        }
      )
      // var list = items.map()
      return (
        <div className="container">
          <br/>
          <ul>{ keys }</ul>
        </div>
      )
    } else if(isLoaded == null) {
      return (<Loading />)
    } else {
      return (<ErrorManager status={ this.state.status } />)
    }
  }
}

export default Reports
