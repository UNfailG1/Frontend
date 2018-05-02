import React, { Component } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import login_img from '../assets/login_img.jpg'
import defaultAvatar from '../assets/user.svg'
import { GET, GET_AUTH, PATCH, FPATCH, BASE_URL } from '../js/requests'
import Loading from './Loading'

class Stats extends Component {

  constructor(props){
    super(props)
    this.state = {
      items: [],
      loading: true
    }
  }

  componentWillMount(){
    GET('/statistics/mails_sent_record?start_date=20180101&end_date=20180201&per_day=1').then(
      (res) => {
        console.log(res)
        this.setState({
          loading: false,
          items: res
        })
      }
    )
  }

  componentDidMount(){
    const $ = window.$
    document.title = 'Statistics'
    $(document).ready(function() {
      $('select').material_select();
    });
  }

  // Asegurarse del funcionamiento de materialize
  componentDidUpdate(){
      const $ = window.$
      $(document).ready(function() {
        $('select').material_select();
      });
   }

  handleChange(event){
    const avatar = URL.createObjectURL(event.target.files[0])
    this.setState({ avatar })
  }

  render(){
    if(this.state.loading === false){
      const {items} = this.state
      const data = [
            {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
            {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
            {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
            {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
            {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
            {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
            {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      ];
      /*
        Los datos deberian estar en el formato:
        const data = [
            {date: '2018-01-01', msg: 48},
            {date: '2018-01-02', msg: 54},
            {date: '2018-01-03', msg: 59},
            {date: '2018-01-04', msg: 56}
        ];
      */
      return (
        <figure className="back_image">
          <img src={ login_img } alt="login_image"/>
          <figcaption>
            <div className="center-align graph-panel">
              <div className="white">
                <LineChart width={600} height={300} data={data}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <Tooltip/>
                  <Legend />
                  <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="amt" stroke="#ffa500" />
                </LineChart>
              </div>
            </div>
          </figcaption>
        </figure>
      )
    }
    else{
      return(<Loading />)
    }
  }
}

export default Stats
