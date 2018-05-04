import React, { Component } from 'react'
import { AreaChart, Area, PieChart, Pie, LineChart, Line, BarChart, Bar, 
        XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import login_img from '../assets/login_img.jpg'
//import defaultAvatar from '../assets/user.svg'
import { GET } from '../js/requests'
import Loading from './Loading'

class Stats extends Component {

  constructor(props){
    super(props)
    this.state = {
      startDate: '20180101',
      endDate: '20180201',
      perDay: '1',
      currentDPicker: 'initDate',
      mostCommented: [],
      mostPlayed: [],
      userRegister: [],
      mails: [],
      genre: [],
      players: [],
      loading: true
    }
    this.changeDates = this.changeDates.bind(this);
    
    this.getMCommented = this.getMCommented.bind(this);
    this.getMPlayed = this.getMPlayed.bind(this);
    this.getUserRegister = this.getUserRegister.bind(this);
    this.getMails = this.getMails.bind(this);
    this.getGenre = this.getGenre.bind(this);
    this.getPlayers = this.getPlayers.bind(this);
  }


  componentWillMount(){
    this.getMCommented();
    this.getMPlayed();
    this.getUserRegister();
    this.getMails();
    this.getGenre();
    this.getPlayers();
  }

  componentDidMount(){
    const $ = window.$
    document.title = 'Statistics'
    $(document).ready(function() {
        $('.datepicker').pickadate({
          selectMonths: true,
          selectYears: true
        });
    });
  }

  // Asegurarse del funcionamiento de materialize
  componentDidUpdate(){
    console.log(document.body.scrollHeight);
    const $ = window.$
    $(document).ready(() => {
      const state = this
      $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: true,
        onOpen: function() {
          state.setState({currentDPicker: this.get('id')}); // Determinar cual DatePicker esta abierto
        },
        onSet: (context) => {
          this.changeDates(context)
        }
      });
    });
   }
  
  changeDates(context){
    const date = new Date(context.select);
    
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    
    year = String(year)
    month = String(month)
    
    if(month < 10){
      month = '0'.concat(month);
    }else{
      month = String(month)
    }
    
    if(day < 10){
      day = '0'.concat(day);
    }else{
      day = String(day)
    }
    
    const stringDate = year + month + day;
    console.log(stringDate);
    
    if(this.state.currentDPicker === 'initDate'){
      this.setState({startDate: stringDate});
    }else{
      this.setState({endDate: stringDate});
    }
    
    this.getMails();
    this.getUserRegister();
  }
  
  getMCommented(){
    const routeCommented = '/statistics/thr_most_commented'
    GET(routeCommented).then(
      (res) => {
        console.log(res)
        this.setState({
          loading: false,
          mostCommented: res.data.slice(0, 11)
        })
      }
    )
  }
  
  getMPlayed(){
    const routeMails = '/statistics/gam_most_played'
    GET(routeMails).then(
      (res) => {
        console.log(res)
        this.setState({
          loading: false,
          mostPlayed: res.data
        })
      }
    )
  }
  
  getUserRegister(){
    const routeURegister = '/statistics/users_register_record?'.concat('start_date=' + this.state.startDate + 
                                                          '&end_date=' + this.state.endDate + 
                                                          '&per_day=' + this.state.perDay);
    GET(routeURegister).then(
      (res) => {
        console.log(res)
        this.setState({
          loading: false,
          userRegister: res.data
        })
      }
    )
  }
  
  getMails(){
    const routeMails = '/statistics/mails_sent_record?'.concat('start_date=' + this.state.startDate + 
                                                          '&end_date=' + this.state.endDate + 
                                                          '&per_day=' + this.state.perDay);
    GET(routeMails).then(
      (res) => {
        console.log(res)
        this.setState({
          loading: false,
          mails: res.data
        })
      }
    )
  }
  
  getGenre(){
    const routeGenre = '/statistics/genre_most_wanted'
    
    GET(routeGenre).then(
      (res) => {
        console.log(res)
        this.setState({
          loading: false,
          genre: res.data
        })
      }
    )
  }
  
  getPlayers(){
    const routePlayer = '/statistics/best_players'
    
    GET(routePlayer).then(
      (res) => {
        console.log(res)
        this.setState({
          loading: false,
          players: res.data
        })
      }
    )
  }

  render(){
    if(this.state.loading === false){
      const {mostCommented, mostPlayed, mails, genre, userRegister} = this.state
      
      const listMPlayed = mostPlayed.map((game) => <li key={game.id}>{game.gam_name}</li>);
      const listBPlayer = mostPlayed.map((player) => <li key={player.id}>{player.pp_username}</li>);
      
      console.log(document.body.scrollHeight);
      
      return (
        <figure className="back_image">
          <img src={ login_img } alt="login_image"/>
          <figcaption>
            <div className="center-align graph-panel max-height">
              <div className="card-panel white center-align">
                <h1>Admin Stats</h1>
                <table>
                  <tr>
                    <td>
                      <h4>Mails Sent</h4>
                      <form>
                        <h6>Initial Date</h6>
                        <input id="initDate" type="date" className="datepicker"/>
                        <h6>Final Date</h6>
                        <input id="lastDate" type="date" className="datepicker"/>
                      </form>
                      <AreaChart width={500} height={300} data={mails}
                        margin={{top: 5, right: 20, left: 10, bottom: 5}}>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        <Area type="monotone" dataKey="count" stroke="#8884D8" fill="#C1D5DA"/>
                      </AreaChart>
                    </td>
                    <td className="center-align">
                      <h4>Most Commented Threads</h4>
                      <PieChart width={800} height={400}>
                        <Pie isAnimationActive={false} data={mostCommented} nameKey="thr_name" dataKey="thr_comments" cx={350} cy={200} outerRadius={120} fill="#FF7043" label/>
                        <Tooltip/>
                      </PieChart>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>Users Registered</h4>
                      <form>
                        <h6>Initial Date</h6>
                        <input id="initDate" type="date" className="datepicker"/>
                        <h6>Final Date</h6>
                        <input id="lastDate" type="date" className="datepicker"/>
                      </form>
                      <LineChart width={500} height={300} data={userRegister}
                        margin={{top: 5, right: 20, left: 10, bottom: 5}}>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#8884D8" dot={false}/>
                      </LineChart>
                    </td>
                    <td className="center-align">
                      <h4>Most Played Games</h4>
                      <ul>{listMPlayed}</ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>Most Wanted Genres</h4>
                      <BarChart width={500} height={250} data={genre}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="gen_name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="id" fill="#8884d8" />
                      </BarChart>
                    </td>
                    <td>
                      <h4>Best Players</h4>
                      <ul>{listBPlayer}</ul>
                    </td>
                  </tr>
                </table>
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
