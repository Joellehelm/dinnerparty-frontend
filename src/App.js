import React, { Component } from 'react';
import MainContainer from './components/MainContainer'

class App extends Component {
 


  render() {
    return (
      <div>
       
        <MainContainer cableApp={this.props.cableApp}/>
      </div>
    );
  }
}

export default App;