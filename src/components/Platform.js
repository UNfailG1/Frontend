import React, { Component } from 'react'
import PlatformItem from './PlatformItem'

class Platform extends Component {

    constructor(props){
        super(props)
        this.state = {
            items: [],
            isLoaded: false,
            error: null
        }
    }
    
    componentDidMount(){
        const $ = window.$
        document.title = "Platforms";
        $(document).ready(function(){
            $('.collapsible').collapsible();
          });
      }

    request(url){
        let token = "Bearer " + localStorage.getItem("jwt")
        console.log(token)
        $.ajax({
          url: url,
          type: "GET",
          beforeSend: function(xhr){xhr.setRequestHeader('Authorization', token)},
          context: this, // Allows us to use this.setState inside success
          success: function (result) {
            console.log(result)
            this.setState({
                        items: JSON.stringify(result),
                        isLoaded: true
                    })
          }
        })
        /*fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result,
                        isLoaded: true
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })*/
    }
    
    componentWillMount(){
       // const game_id = this.props.game_id
        
        this.request('https://spairing-api.herokuapp.com/platforms')
    }
    
    // Asegurarse del funcionamiento de materialize
    componentDidUpdate(){
        const $ = window.$
        document.title = "Platforms";
        $(document).ready(function(){
            $('.collapsible').collapsible();
          });
    }

    render(){
        const { items, isLoaded } = this.state
        //const game_id = this.props.game_id
        
        console.log(items)
        
        if(isLoaded){
            var list
            list = items.map((item) => <PlatformItem key={item.id} item={item} />)
            
            return (<ul className="collapsible">{list}</ul> )
        }else{
            return (<h1>Loading...</h1>)
        }
    }
    
}

export default Platform