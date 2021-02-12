import React from 'react';
import axios from 'axios';
import {  Link, BrowserRouter as Router } from 'react-router-dom';
//about and navigation are pending
class Home extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            searchdata: "",
            searchshows: [],
            allshows: [],
            popular: [],
            render:true
        }
    }
//filters all shows to popular
    componentWillMount()
    {
        axios.get(`http://api.tvmaze.com/shows`)
        .then(response => {
            this.setState({allshows:response.data})
            console.log(this.state.allshows)
            this.setState({popular:response.data
                .filter(show => show.rating.average)
                .sort((a, b) => (a.rating.average < b.rating.average ? 1 : -1))
                .slice(0, 12)})
                console.log('popular',this.state.popular)
        })
        .catch(error =>{
            console.log("error",error)
        })
    
    }
    //style for shows
    grid={
        width: '25%',
  height: '100%',
  float: 'left',
  margin:'50px'
    }
    //track search data
    senddata=event=>{
        this.setState({searchdata:event.target.value})
        console.log(this.state.searchdata)
        
    }
    //use search data to call rest api
    submitform=event=>{
        this.setState({render:false})
        event.preventDefault()
            axios
              .get(`http://api.tvmaze.com/search/shows?q='${this.state.searchdata}`)
              .then((response) => {
                this.setState({searchshows:response.data})
                console.log(this.state.searchshows)
              })
         
        .catch(error =>{
            console.log("not added",error)
        })
    }
    
    render(){
        return(
            <div>
                <Router>
                {/* navbar */}
<nav class="navbar navbar-expand-lg navbar-light bg-dark">
  <a class="navbar-brand" href="/">MovieBoxOffice</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <form class="form-inline my-2 my-lg-0" onSubmit={this.submitform}>
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.senddata} />
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
{/* displays populat shows and when user search particular show it disappear */}

                {this.state.render&&<div>{this.state.popular.map((movie)=>
                <Link to ={`/about/${movie.id}`}>
                <div style={this.grid}>
                    <h4>Name:{movie.name}</h4>
                    <img src={movie.image.medium}  />
                    <h3>Language:{movie.language}</h3>
                    <h3>Average:{movie.rating.average}</h3>
                    </div>
                    </Link>
                )
                }</div>}
                {/* displays search shows */}
                {this.state.searchshows.map((show)=>
                <Link to ={`/about/${show.show.id}`}>
                <div style={this.grid}>
                    <h4>{ show.show.name }</h4>
                   {show.show.image !=null && <img src={show.show.image.medium}  />}
                    <h3>Language:{show.show.language}</h3>
                    <h3>Rating:{show.show.status}</h3>
                    </div>
                    </Link>
                )
                }
</Router>
                </div>
            
        )
    }
}
export default Home;