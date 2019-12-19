import React, { Component } from 'react';
import NavBar from './NavBar'
import Parties from './Parties'

class Account extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <Parties auth={this.props.auth}/>
            </div>
        );
    }
}

export default Account;