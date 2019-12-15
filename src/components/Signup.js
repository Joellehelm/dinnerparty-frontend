import React, { Component } from 'react';
import {connect} from 'react-redux'
import { register } from '../actions/auth'



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
      this.props.register(user)
      // this.props.register(user, this.props.history)
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
              type="new-password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <input
              className="input"
              placeholder="password confirmation"
              type="new-password"
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



  const mapStateToProps = (state) => ({
      auth: state.auth
  })
  
  export default connect(mapStateToProps, { register })(Signup);