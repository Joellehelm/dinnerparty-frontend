import React, { Component } from 'react';
// import Login from './Login'
// import Signup from './Signup'
import Home from './Home'
import Registration from './Registration'
import { connect } from 'react-redux'
import Testing from '../testing'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";



//   const login = (props) => {
//       return (
//           <Login handleLogin={this.props.handleLogin} loggedInStatus={this.props.isLoggedIn}/>
//       )
//   }

  
//   const signup = (props) => {
//     return(
//         <Signup handleLogin={this.props.handleLogin} loggedInStatus={this.props.isLoggedIn} />
//     )
//   }


//   const home = (props) => {

//     return (
     
//         <div>HOME</div>
//     )
// }


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


    comonentDidUpdate(){
        debugger
    }

    render() {
        return (

            <Router>
            <div >
                {
                    this.props.auth.isLoggedIn ?
               
                
                <Switch>


                    <Route exact path = "/">
                        <Home />
                        
                        </Route>

                    <Route exact path = "/messages" component={messages}>

                        </Route>

                    <Route exact path = "/account" component={account}>

                        </Route>

                    </Switch>
                    :
                    <Registration handleLogin={this.props.handleLogin} loggedInStatus={this.props.isLoggedIn} /> 
                    }
            </div>
            </ Router>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
  })

export default connect(mapStateToProps)(MainContainer);