import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        username: '',
        password: '',
        errors: ''
       };
    }
    // componentWillMount() {
    //   return this.props.loggedInStatus ? this.redirect() : null
    // }
  handleChange = (event) => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })
    };
  handleSubmit = (event) => {
      event.preventDefault()
      const {username, password} = this.state
        let user = {
        username: username,
        password: password
      }
      this.props.login(user)
    
      
    };
  redirect = () => {
      this.props.history.push('/')
    }

  render() {
      const {username, password} = this.state
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
              placeholder="password"
              type="new-password"
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

  const mapStateToProps = (state) => ({
    auth: state.auth
  })


  export default connect(mapStateToProps, { login })(Login);