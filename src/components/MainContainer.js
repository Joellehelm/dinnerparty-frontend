import React, { Component } from 'react';
import Login from './Login'
import Signup from './Signup'

class MainContainer extends Component {
    render() {
        return (
            <div>
                <Login handleLogin={this.props.handleLogin} loggedInStatus={this.props.isLoggedIn} />
                <Signup handleLogin={this.props.handleLogin} loggedInStatus={this.props.isLoggedIn} />
            </div>
        );
    }
}

export default MainContainer;