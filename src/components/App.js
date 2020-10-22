import React,{Component} from 'react';

import '../index.css';
import Artist from './Artist';
import Tracks from './Tracks';
import Search from './Search';
const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com';

class App extends Component {
  state ={artist:null, tracks:[]};

  searchArtist = (artistQuery) => {
    var artist_query =artistQuery;

    fetch(`${API_ADDRESS}/artist/${artist_query}`)
    .then(response => response.json())
    .then(json=>{

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

 
 render(){
    return (
      <div>
        <h2>Music master</h2>
        <Search searchArtist={this.searchArtist}/>
        {
          this.state.artist == null ? null : <Artist artist={this.state.artist}/>
        }
        <Tracks tracks={this.state.tracks}/>
      </div>
    );
  }
}
export default App;
