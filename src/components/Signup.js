import React, { Component } from 'react';
import { connect } from 'react-redux'
import { register } from '../actions/auth'
import '../style/login.css'



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
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault()
    const { username, email, password, password_confirmation } = this.state
    let user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      status: "created"
    }
    this.props.register(user)

    this.setState({
      username: "",
      email: "",
      password: "",
      password_confirmation: ""
    })
    this.successModal()
  }


  successModal = () => {

    if (this.props.auth.user === "no") {

      return <div className="badSignup"><p>That username or email is already in use.</p></div>
    }
    if (this.props.auth.creation === true) {

      return <div className="goodSignup"><p>Account Successfully Created!</p></div>
    }

  }




  render() {
    const { username, email, password, password_confirmation } = this.state
    return (
      <div>
        <div className="form-container sign-up-container">
          <form className="resform" onSubmit={this.handleSubmit}>
            <h1 className="loginH1">Create Account</h1>
            <input className="logInput" type="text" placeholder="Name" name="username" value={username} onChange={this.handleChange} />
            <input className="logInput" type="email" placeholder="Email" name="email" value={email} onChange={this.handleChange} />
            <input className="logInput" type="password" autoComplete="new-password" placeholder="Password" name="password" value={password} onChange={this.handleChange} />
            <input className="logInput" type="password" autoComplete="new-password" placeholder="Password Confirmation" name="password_confirmation" value={password_confirmation} onChange={this.handleChange} />
            <button className="resbutton" type="submit">Sign Up</button>

            {this.successModal()}
          </form>
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => ({
  auth: state.auth,

})

export default connect(mapStateToProps, { register })(Signup);




