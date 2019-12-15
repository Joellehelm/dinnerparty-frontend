import React, { Component } from 'react';
import Login from './Login'
import Signup from './Signup'
import Testing from '../testing'

class MainContainer extends Component {
    render() {
        return (
            <div>
                <Login handleLogin={this.props.handleLogin} loggedInStatus={this.props.isLoggedIn} />
                <Signup handleLogin={this.props.handleLogin} loggedInStatus={this.props.isLoggedIn} />
                <Testing />
            </div>
        );
    }
}

export default MainContainer;