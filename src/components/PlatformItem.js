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
                  <div class="collapsible-header"><i class="material-icons">filter_drama</i>{item.plat_name}</div>
                  <div class="collapsible-body"><span>{item.plat_link}</span></div>
                </li>
        )

    }
}

export default PlatformItem