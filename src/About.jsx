import React from 'react';
import axios from 'axios';
class About extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            particularshow:[],
      showId:this.props.match.params.id,
      cast:[],
      episodes:[],
      render:false
        }
    }
    componentWillMount()
    {
        axios.get(`http://api.tvmaze.com/shows/`+this.state.showId)
        .then(response => {
            this.setState({particularshow:response.data})
            console.log('particular show',this.state.particularshow)
            console.log('image',this.state.particularshow.image.medium)
        })
        .catch(error =>{
            console.log("error",error)
        })
    
    }
    data={
        width: '800px',
        borderradius:' 10px',
        //  border:'1px solid #f1f1f1',
        margin:'45px',
        //  float: 'left',
        height: '700px'
      }
    image={
        width: '25%',
  height: '100%',
  float: 'left',
  margin:'50px'
    }
    showcast=()=>{
        this.setState({render:true})
        axios.get(`http://api.tvmaze.com/shows/${this.state.showId}/cast`)
        .then(response => {
            this.setState({cast:response.data})
            console.log('cast',this.state.cast)
            console.log('image',this.state.cast[0].person.image.medium)
        })
    }
    episodedetails=()=>{
        this.setState({render:false})
        axios.get(`http://api.tvmaze.com/shows/${this.state.showId}/episodes`)
        .then(response => {
            this.setState({episodes:response.data})
            console.log('episodes',this.state.episodes)
            // console.log('image',this.state.cast[0].person.image.medium)
        })
    }
    render(){
        return(
            <div>
                <div style={this.image}>
                {this.state.particularshow.image !=null &&<img src={this.state.particularshow.image.medium} />}
                </div>
                <div style={this.data}>
                <h4>  ID:{this.state.showId}<br /></h4>
                <h4>  LANGUAGE:{this.state.particularshow.language}<br /></h4>
                <h4>  RunTime:{this.state.particularshow.runtime}<br /></h4>
                <h4> Status:{this.state.particularshow.status}<br /></h4>
                {this.state.particularshow.rating!=null && <h4> <span>Rating:{this.state.particularshow.rating.average}</span></h4>}
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.showcast}>Show Cast</button>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.episodedetails}>Show Episodes</button>
                {this.state.render && <div>{this.state.cast.map((c)=>{
                    <div>
                    <p>{c.person.name}</p>
                       <img src={c.person.image.medium} />
                   </div>
                })}</div>}
                {this.state.render && <div>{this.state.episodes.map((e)=>{
                    <div>
                    <p>{e.name}</p>
                       <img src={e.image.medium} />
                   </div>
                })}</div>}
                </div>
                
                
                
            </div>
        )
    }
}

export default About;