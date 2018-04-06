import React, { Component } from 'react'
import ForumCard from './ForumCard'
import $ from 'jquery'

class ForumList extends Component {

    constructor(props){
        super(props)
        this.state = {
            items: [],
            isLoaded: false,
            error: null
        }
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
        
        this.request('https://spairing-api.herokuapp.com/sub_forums/')
    }

    render(){
        const { items, isLoaded } = this.state
        //const game_id = this.props.game_id
        
        console.log(items)
        
        if(isLoaded){
            var list
            list = items.map((item) => <ForumCard key={item.id} item={item} />)
            
            return (<ul>{list}</ul>)
        }else{
            return (<h1>Loading...</h1>)
        }
    }
    
}

export default ForumList