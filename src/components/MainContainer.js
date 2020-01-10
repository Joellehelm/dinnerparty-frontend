import React, { Component } from 'react';
// import Login from './Login'
// import Signup from './Signup'
import Home from './Home'
import NavBar from './NavBar'
import Registration from './Registration'
import Recipes from './Recipes'
import { connect } from 'react-redux'
import ShowRecipe from './ShowRecipe'
import ShoppingList from './ShoppingList'
import Account from './Account'
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";





const messages = (props) => {
    return (
        <div><h1>Coming Soon...</h1></div>
    )
}





class MainContainer extends Component {



    handleRedirect = (event) => {
        const type = event.target.innerText

        if(type === "Account"){
            
        }
    }
    

    render() {
        return (

            <BrowserRouter>
            <div >
                {
                    this.props.auth.isLoggedIn ?
               
                
                <Switch>
                    
                    <Route 
                    exact path='/' 
                    render={props => (
                    <Home {...props} handleRedirect={this.handleRedirect}/>
                     )}
                    />

                
                    <Route 
                    exact path='/recipe' 
                    render={props => (
                    
                        <ShowRecipe {...props} handleRedirect={this.handleRedirect}/>
                     )}
                    />
                


                    <Route 
                    exact path='/account' 
                    render={props => (
                    <Account {...props} auth={this.props.auth} handleRedirect={this.handleRedirect}/>
                     )}
                    />




                    <Route 
                    exact path='/list' 
                    render={props => (
                    <ShoppingList {...props} auth={this.props.auth} handleRedirect={this.handleRedirect}/>
                     )}
                    />

                

                



                    </Switch>
                    :
                    <Registration history={this.props.history} handleLogin={this.props.handleLogin} loggedInStatus={this.props.isLoggedIn} /> 
                    }
            </div>
            </ BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
  })

export default connect(mapStateToProps)(MainContainer);