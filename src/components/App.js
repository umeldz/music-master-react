import React,{Component} from 'react';

import '../index.css';

class App extends Component {
  state ={artistQuery:''};

  updateArtistQuery =(event)=>{
    console.log('event.target.value', event.target.value);
    this.setState({artistQuery:event.target.value});
  }

  searchArtist = () => {
    console.log('state', this.state)
  }

  handleKeyPress = (event) => {
    if(event.key==='Enter'){
      console.log('state', this.state)
    }
  }
 
 render(){
    return (
      <div>
        <h2>Music master</h2>
        <input 
        placeholder='Search for an Artist' 
        onChange={this.updateArtistQuery}
        onKeyPress={this.handleKeyPress}
        />
        <button onClick={this.searchArtist}>Search</button>
      </div>
    );
  }
}
export default App;
