import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { logout } from '../actions/auth';
import '../style/login.css'



class Login extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        username: '',
        password: '',
        errors: '',
        loggedIn: false
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
      const {username, password} = this.state
        let user = {
        username: username,
        password: password
      }
      
      this.props.login(user)
      this.setState({
        loggedIn: true,
        username: "",
        password: ""
      })
      
   
     
      
    };



  // redirect = () => {
  //     this.state.history.push('/')
    // }


    handleButton = (event) => {
      event.preventDefault()
      this.props.logout()
      this.setState({
        loggedIn: false
      })
    }





  render() {
      const {username, password} = this.state
    
  return (
  
    <>
      {/* {this.state.loggedIn === true ? <button onClick={this.handleButton}>LOGOUT</button> */}
        
        <>
	<div className="form-container sign-in-container">
		<form className="resform" onSubmit={this.handleSubmit}>
			<h1 className="loginH1">Sign in</h1>
		
		
			<input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
			<input type="password" autoComplete="current-password" name="password" placeholder="Password" value={password} onChange={this.handleChange}/>
			{/* <a href="#">Forgot your password?</a> */}
			<button className="resbutton" type="submit">Sign In</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-left">
				<h1 className="loginH1">Welcome Back!</h1>
				<p className="loginP">To keep connected with us please login with your personal info</p>
				<button onClick={this.props.handleSwap} className={"ghost", "resbutton"} id="signIn">Sign In</button>
			</div>
			<div className="overlay-panel overlay-right">
				<h1 className="loginH1">Hello, Friend!</h1>
				<p className="loginP">Enter your details and start your journey with us</p>
				<button onClick={this.props.handleSwap} className={"ghost", "resbutton"} id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
  </>
  
</>

      );
    }
  }

  const mapStateToProps = (state) => ({
    auth: state.auth
  })

  const mapDispatchToProps = {
 
      login,
      logout
    
  }


  export default connect(mapStateToProps, mapDispatchToProps)(Login);


































  // return (
  //   <div>
  //     {
  //       // this.props.auth.jwt === localStorage.getItem('token') || 
  //       this.state.loggedIn === true ? <button onClick={this.handleButton}>LOGOUT</button>
  //       :
  //       <div className="login">
          
        
  //         <form className="form" onSubmit={this.handleSubmit}>
  //           <input
  //             className="input"
  //             placeholder="username"
  //             type="text"
  //             name="username"
  //             value={username}
  //             onChange={this.handleChange}
  //           />   
           
        
  //           <input
  //             className="input"
  //             placeholder="password"
  //             type="new-password"
  //             name="password"
  //             value={password}
  //             onChange={this.handleChange}
  //           />
  //           <button className="loginbutton" placeholder="submit" type="submit">
  //             <h4 className="logintext">Log In</h4>
  //           </button>
    
            
  //           </form>
  //           <div>
  //           {
  //             this.state.errors ? this.handleErrors() : null
  //           }
  //         </div>
  //       </div>
  // }
  //       </div>
  //     );
  //   }
  // }