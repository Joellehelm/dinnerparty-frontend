import React, { Component } from 'react';
import MainContainer from './components/MainContainer'

class App extends Component {
  constructor() {
    super();
    this.state = { 
      isLoggedIn: false,
      user: {},
      navClick: "none"
     };
  }
componentDidMount() {
    this.loginStatus()
  }
loginStatus = () => {
    fetch('http://localhost:3000/logged_in')
    .then(r => r.json())
    .then(response => {
      if (response.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }
handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }
handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }



  render() {
    return (
      <div>
        <MainContainer user={this.state.user} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} />
      </div>
    );
  }
}

export default App;