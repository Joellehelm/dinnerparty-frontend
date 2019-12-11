import React, { Component } from 'react';

class Signup extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        errors: ''
       };
    }
  
  
  handleChange = (event) => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })
    };
  
  
  handleSubmit = (event) => {
      event.preventDefault()
      const {username, email, password, password_confirmation} = this.state
      let user = {
        username: username,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        status: "created"
      }
  
      fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({user})
  })
  
      .then(r => r.json())
      .then(response => {
       
        if (response.status === 'created') {
          this.props.handleLogin(response)
          this.redirect()
        } else {
          this.setState({
            errors: response.errors
          })
        }
      })
      .catch(error => console.log('api errors:', error))
    };
  
  
  redirect = () => {
      this.props.history.push('/')
    }
  
  
  handleErrors = () => {
      return (
        <div>
          <ul>{this.state.errors.map((error) => {
            return <li key={error}>{error}</li>
          })}</ul> 
        </div>
      )
    }
  
  
  
  render() {
      const {username, email, password, password_confirmation} = this.state
  return (
        <div>
         
          <form className="form" onSubmit={this.handleSubmit}>
            <input
              className="input"
              placeholder="username"
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            <input
              className="input"
              placeholder="email"
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <input 
              className="input"
              placeholder="password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <input
              className="input"
              placeholder="password confirmation"
              type="password"
              name="password_confirmation"
              value={password_confirmation}
              onChange={this.handleChange}
            />
          
            <button placeholder="submit" type="submit">
              Sign Up
            </button>
        
          </form>
          <div>
            {
              this.state.errors ? this.handleErrors() : null
            }
          </div>
        </div>
      );
    }
  }
  export default Signup;