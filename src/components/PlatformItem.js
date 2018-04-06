import React, { Component } from 'react'

class PlatformItem extends Component {

    constructor(props){
        super(props)
        this.state = {
            show: false
        }
    }

    render(){
        const item = this.props.item
        
        return(
              <li>
                  <div className="collapsible-header"><i className="material-icons">filter_drama</i>{item.plat_name}</div>
                  <div className="collapsible-body"><a href={item.plat_link}><span>{item.plat_link}</span></a></div>
                </li>
        )

    }
}

export default PlatformItem