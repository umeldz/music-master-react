import React,{Component} from 'react';

import '../index.css';
import Artist from './Artist';
import Tracks from './Tracks';
const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com'

class App extends Component {
  state ={artistQuery:'', artist:null, tracks:[]};

  updateArtistQuery =(event)=>{
   // console.log('event.target.value', event.target.value);
    this.setState({artistQuery:event.target.value});
  }

  searchArtist = () => {
    var artist_query =this.state.artistQuery;

    fetch(`${API_ADDRESS}/artist/${artist_query}`)
    .then(response => response.json())
    .then(json=>{
      //console.log('json',json)
      if(json.artists.total > 0){
        const artist = json.artists.items[0];
        console.log('artist',artist)
       
        this.setState({artist: artist});

        fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
        .then(response => response.json())
        .then(json => this.setState({tracks: json.tracks}))
        .catch(error =>alert(error))
      }
    })
    .catch(error =>{alert(error)});
  }

  handleKeyPress = (event) => {
    if(event.key==='Enter'){
      this.searchArtist();
    }
  }
 
 render(){
  // console.log('here',this.state);
    return (
      <div>
        <h2>Music master</h2>
        <input 
        placeholder='Search for an Artist' 
        onChange={this.updateArtistQuery}
        onKeyPress={this.handleKeyPress}
        />
        <button onClick={this.searchArtist}>Search</button>
        {
          this.state.artist == null ? null : <Artist artist={this.state.artist}/>
        }
        <Tracks tracks={this.state.tracks}/>
      </div>
    );
  }
}
export default App;
