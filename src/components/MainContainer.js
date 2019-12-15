import React, { Component } from 'react';
import Login from './Login'
import Signup from './Signup'
import Testing from '../testing'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";



  const login = (props) => {
      return (
          <Login handleLogin={this.props.handleLogin} loggedInStatus={this.props.isLoggedIn}/>
      )
  }

  
  const signup = (props) => {
    return(
        <Signup handleLogin={this.props.handleLogin} loggedInStatus={this.props.isLoggedIn} />
    )
  }


  const home = (props) => {
    return (
        <div>HOME</div>
    )
}


const messages = (props) => {
    return (
        <div>MESSAGES</div>
    )
}


const account = (props) => {
    return (
        <div>ACCOUNT</div>
    )
}





class MainContainer extends Component {



    render() {
        return (
            <Router>
            <div>
                {/* <Login handleLogin={this.props.handleLogin} loggedInStatus={this.props.isLoggedIn} /> */}
                {/* <Signup handleLogin={this.props.handleLogin} loggedInStatus={this.props.isLoggedIn} /> */}
            
                <Switch>
                    <Route exact path = "/" component={home}>
                        
                        </Route>
                    <Route exact path = "/messages" component={messages}>

                        </Route>
                    <Route exact path = "/account" component={account}>
                        </Route>
                    </Switch>
            </div>
            </ Router>
        );
    }
}

export default MainContainer;