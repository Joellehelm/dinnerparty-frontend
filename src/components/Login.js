import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        username: '',
        email: '',
        password: '',
        errors: ''
       };
    }
    componentWillMount() {
      return this.props.loggedInStatus ? this.redirect() : null
    }
  handleChange = (event) => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })
    };
  handleSubmit = (event) => {
      event.preventDefault()
      const {username, email, password} = this.state
        let user = {
        username: username,
        email: email,
        password: password
      }
      
      fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({user})
      })
      .then(r => r.json())
      .then(response => {
        if (response.logged_in) {
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
          <ul>
          {this.state.errors.map(error => {
          return <li key={error}>{error}</li>
            })
          }
          </ul>
        </div>
      )
    }
  render() {
      const {username, email, password} = this.state
  return (
        <div className="login">
          
        
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
            <button className="loginbutton" placeholder="submit" type="submit">
              <h4 className="logintext">Log In</h4>
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
  export default Login;