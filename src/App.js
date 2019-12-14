import React, { Component } from 'react';
import MainContainer from './components/MainContainer'

class App extends Component {
  constructor() {
    super();
    this.state = { 
      isLoggedIn: false,
      user: {}
     };
  }
componentDidMount() {
    this.loginStatus()
  }
loginStatus = () => {
    fetch('http://localhost:3000/logged_in')
    .then(r => r.json())
    .then(response => {
      if (response.logged_in && localStorage.getItem('token') === this.state.user.jwt) {
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
      user: data
    })
  }
handleLogout = () => {
    localStorage.removeItem('token')
    this.setState({
    isLoggedIn: false,
    user: {}
    })
    // maube just clear local storage, and user, isLoggedIn might not be necessary
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